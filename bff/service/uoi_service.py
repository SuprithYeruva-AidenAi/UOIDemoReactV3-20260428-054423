"""
UOI service layer — single point of contact with InsureMO.

Responsibilities:
    1. Acquire + cache the service-account bearer token.
    2. Inject the bearer + tenant headers into every UOI call.
    3. Handle multipart→JSON+base64 translation for DMS upload.
    4. Surface upstream failures as typed errors the route layer can map.

Configuration is read from environment variables (see .env.example).
This module never logs the bearer token or upstream credentials.
"""
from __future__ import annotations

import asyncio
import base64
import logging
import os
import time
from dataclasses import dataclass
from typing import Any, Optional

import httpx
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("uoi-bff.service")


# ── Configuration ────────────────────────────────────────────────────────────

@dataclass(frozen=True)
class UOIConfig:
    auth_base_url: str
    auth_path: str
    data_base_url: str
    data_api_prefix: str
    username: str
    password: str
    timeout_s: float

    @classmethod
    def from_env(cls) -> "UOIConfig":
        return cls(
            auth_base_url=os.getenv("UOI_AUTH_BASE_URL", "https://uoisitws-sandbox-sg.insuremo.com"),
            auth_path=os.getenv("UOI_AUTH_PATH", "/api/platform/v1/json/tickets"),
            data_base_url=os.getenv("UOI_DATA_BASE_URL", "https://sandbox-sg-gw.insuremo.com"),
            data_api_prefix=os.getenv("UOI_DATA_API_PREFIX", "/uoisitws/v1/uoi-bff-app"),
            username=os.getenv("UOI_USERNAME", ""),
            password=os.getenv("UOI_PASSWORD", ""),
            timeout_s=float(os.getenv("UOI_TIMEOUT_S", "10.0")),
        )

    @property
    def auth_url(self) -> str:
        return f"{self.auth_base_url.rstrip('/')}{self.auth_path}"

    def data_url(self, endpoint: str) -> str:
        endpoint = endpoint.lstrip("/")
        return f"{self.data_base_url.rstrip('/')}{self.data_api_prefix}/{endpoint}"


# ── Typed errors ─────────────────────────────────────────────────────────────

class UOIUpstreamError(Exception):
    """Single error type the route layer matches on. ``kind`` decides
    which HTTP status the React client sees:
        timeout      → 504 → "service is taking longer than usual"
        unavailable  → 503 → "service temporarily unavailable"
        upstream     → 502 → "something went wrong"
    """
    def __init__(self, message: str, kind: str = "upstream", status: int = 0) -> None:
        super().__init__(message)
        self.kind = kind
        self.status = status


# ── Service ──────────────────────────────────────────────────────────────────

class UOIService:
    """Stateful per-process. Token is cached + auto-refreshed."""

    def __init__(self, config: Optional[UOIConfig] = None) -> None:
        self.cfg = config or UOIConfig.from_env()
        self._token: Optional[str] = None
        self._token_expires_at: float = 0.0
        self._token_lock = asyncio.Lock()

    # ── Auth ──────────────────────────────────────────────────────────────────

    async def get_token(self) -> str:
        """Return a valid bearer, fetching/refreshing as needed.
        De-duplicated under a lock so concurrent first-callers share one
        upstream auth request."""
        # Fast path — still valid for at least 60s.
        if self._token and time.time() < self._token_expires_at - 60:
            return self._token

        async with self._token_lock:
            # Re-check inside the lock — another caller may have refreshed.
            if self._token and time.time() < self._token_expires_at - 60:
                return self._token
            token, ttl = await self._fetch_token()
            self._token = token
            self._token_expires_at = time.time() + ttl
            logger.info("UOI token acquired (ttl=%ds)", ttl)
            return token

    async def _fetch_token(self) -> tuple[str, int]:
        async with httpx.AsyncClient(timeout=self.cfg.timeout_s) as client:
            try:
                r = await client.post(
                    self.cfg.auth_url,
                    json={"username": self.cfg.username, "password": self.cfg.password},
                    headers={"Content-Type": "application/json"},
                )
            except httpx.TimeoutException as e:
                raise UOIUpstreamError(f"Auth timeout: {e}", kind="timeout") from e
            except httpx.RequestError as e:
                raise UOIUpstreamError(f"Auth network error: {e}", kind="unavailable") from e
        if r.status_code != 200:
            raise UOIUpstreamError(
                f"Auth failed (status={r.status_code}): {r.text[:200]}",
                kind="unavailable", status=r.status_code,
            )
        body = r.json()
        token = body.get("access_token") or body.get("token") or body.get("ticket") or ""
        ttl = int(body.get("expires_in") or body.get("ttl") or 3000)
        if not token:
            raise UOIUpstreamError(f"Auth returned no token: {body!s:.200s}", kind="upstream")
        return token, ttl

    # ── Data plane ────────────────────────────────────────────────────────────

    async def fetch_order_data(self, body: dict[str, Any], correlation_id: str = "") -> Any:
        return await self._post_json("fetchOrderData", body, correlation_id)

    async def find_issued_policies(self, body: dict[str, Any], correlation_id: str = "") -> Any:
        return await self._post_json("findIssuedPolicies", body, correlation_id)

    async def send_email(self, body: dict[str, Any], correlation_id: str = "") -> Any:
        """InsureMO templated email — used by the claim-submission flow.
        Required keys (per Postman collection):
            Email, FullName, Link, ProductCode, ProductName,
            ProposalNumber, templateCode (e.g. "emailAlert")
        """
        return await self._post_json("email/send", body, correlation_id)

    async def upload_dms_file(
        self, *, policy_no: str, doc_type: str, file_bytes: bytes,
        correlation_id: str = "",
    ) -> dict[str, Any]:
        """InsureMO's dms/file/upload is JSON, NOT multipart. We accept
        multipart on the BFF route for browser DX, then call this method
        which base64-encodes the bytes and posts InsureMO's actual shape:
            {"PolicyNo": "...", "DocType": "...", "Base64Content": "..."}
        """
        body = {
            "PolicyNo": policy_no,
            "DocType": doc_type,
            "Base64Content": base64.b64encode(file_bytes).decode("ascii"),
        }
        return await self._post_json("dms/file/upload", body, correlation_id)

    # ── HTTP plumbing ────────────────────────────────────────────────────────

    async def _post_json(
        self, endpoint: str, body: dict[str, Any], correlation_id: str = "",
    ) -> Any:
        url = self.cfg.data_url(endpoint)
        token = await self.get_token()
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        }
        if correlation_id:
            headers["X-Correlation-Id"] = correlation_id
        async with httpx.AsyncClient(timeout=self.cfg.timeout_s) as client:
            try:
                r = await client.post(url, json=body, headers=headers)
            except httpx.TimeoutException as e:
                raise UOIUpstreamError(f"{endpoint} timeout: {e}", kind="timeout") from e
            except httpx.RequestError as e:
                raise UOIUpstreamError(f"{endpoint} network error: {e}", kind="unavailable") from e
        if r.status_code == 401:
            # Token may have expired between cache and call — refresh once + retry.
            self._token = None
            token = await self.get_token()
            headers["Authorization"] = f"Bearer {token}"
            async with httpx.AsyncClient(timeout=self.cfg.timeout_s) as client:
                r = await client.post(url, json=body, headers=headers)
        if r.status_code >= 500:
            raise UOIUpstreamError(
                f"{endpoint} upstream {r.status_code}: {r.text[:200]}",
                kind="unavailable", status=r.status_code,
            )
        if r.status_code >= 400:
            raise UOIUpstreamError(
                f"{endpoint} client error {r.status_code}: {r.text[:200]}",
                kind="upstream", status=r.status_code,
            )
        return r.json() if r.content else {}
