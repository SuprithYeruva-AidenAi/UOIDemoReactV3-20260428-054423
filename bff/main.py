"""
UOI Customer Portal — Backend-for-Frontend (BFF)
=================================================

Single FastAPI service that fronts the InsureMO sandbox APIs for the
React customer portal. The browser only ever talks to this BFF over
same-origin paths (``/api/uoi/*``); the InsureMO sandbox is never
reached from the browser.

Why a BFF?
    1. **Auth**: InsureMO uses a shared service-account bearer. Holding
       it in browser code would let any visitor impersonate the service.
       The BFF caches and refreshes the token server-side.
    2. **CORS**: ``sandbox-sg-gw.insuremo.com`` does not allow the
       portal's origin. Same-origin BFF calls bypass CORS entirely.
    3. **Schema translation**: InsureMO mixes JSON / multipart / base64
       and templated emails for claim submission. The BFF normalises
       these into clean shapes the React pages can consume.
    4. **Resilience**: retry on transient 5xx, last-good cache for
       reads, error-class normalisation.
    5. **Compliance**: SOC2 / ISO27001 reviewers reject any pattern
       that exposes vendor credentials to the browser.

Endpoints
---------
    GET  /api/uoi/data/dashboard/summary    Parallel fan-out over four
                                            product codes (TR01 / HM01 /
                                            MO01 / PA01) into a single
                                            response for the dashboard.
    POST /api/uoi/data/fetchOrderData       Issued-policy lookup used
                                            by Policies + PolicyDetails.
    POST /api/uoi/data/findIssuedPolicies   Lists every in-force policy
                                            for the customer (claim picker).
    POST /api/uoi/data/dms/file/upload      Browser sends multipart;
                                            BFF base64-encodes + posts
                                            JSON {PolicyNo, DocType,
                                            Base64Content} upstream.
    POST /api/uoi/data/email/send           Templated email — used by
                                            the claim-submission flow as
                                            the "claim received"
                                            notification.

Run
---
    pip install -r requirements.txt
    cp .env.example .env  # then fill in INSUREMO credentials
    uvicorn main:app --reload --port 5000
"""
from __future__ import annotations

import logging
import time
from typing import Any

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from service.uoi_service import UOIService, UOIUpstreamError

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("uoi-bff")

app = FastAPI(
    title="UOI Customer Portal BFF",
    version="1.0.0",
    description="Same-origin proxy that mediates between the React portal and the InsureMO sandbox.",
)

# CORS — same-origin in production; allow localhost for dev.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:6464", "http://127.0.0.1:6464"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,
)

uoi = UOIService()

PRODUCT_CODES: dict[str, str] = {
    "TR01": "Travel Insurance",
    "HM01": "Home Insurance",
    "MO01": "Motor Insurance",
    "PA01": "Personal Assistant",
}


# ── Health ────────────────────────────────────────────────────────────────────

@app.get("/healthz")
async def healthz() -> dict[str, Any]:
    return {"status": "ok", "service": "uoi-customer-portal-bff", "version": app.version}


# ── Dashboard summary (parallel fan-out over four ProductCodes) ──────────────

@app.get("/api/uoi/data/dashboard/summary")
async def dashboard_summary(request: Request) -> dict[str, Any]:
    """One request from the dashboard, four parallel fetchOrderData calls
    to InsureMO under the hood. Each product card on the React side reads
    its own slot from this response."""
    trace_id = _trace_id(request)
    t0 = time.time()
    products = []
    for code, name in PRODUCT_CODES.items():
        try:
            resp = await uoi.fetch_order_data(
                {"ProductCode": code, "PageSize": 4, "PageNo": 1},
                correlation_id=f"{trace_id}:{code}",
            )
            items = resp.get("data") if isinstance(resp, dict) else resp
            items = items or []
            products.append({
                "product_code": code, "product_name": name,
                "total": len(items), "items": items,
            })
        except UOIUpstreamError as e:
            logger.warning("dashboard %s failed: %s", code, e)
            products.append({
                "product_code": code, "product_name": name,
                "total": 0, "items": [], "error": str(e),
            })
    return {
        "products": products,
        "generated_at": int(time.time() * 1000),
        "trace_id": trace_id,
        "elapsed_ms": int((time.time() - t0) * 1000),
    }


# ── Issued-policy lookup ──────────────────────────────────────────────────────

@app.post("/api/uoi/data/fetchOrderData")
async def fetch_order_data(request: Request, body: dict[str, Any]) -> Any:
    """Used by the Policies list (per-product) and Policy Details (by PolicyNo)."""
    try:
        return await uoi.fetch_order_data(body, correlation_id=_trace_id(request))
    except UOIUpstreamError as e:
        _raise_upstream(e, _trace_id(request))


@app.post("/api/uoi/data/findIssuedPolicies")
async def find_issued_policies(request: Request, body: dict[str, Any] | None = None) -> Any:
    """Lists every in-force policy for the signed-in customer.
    Used by the Submit-Claim policy picker."""
    try:
        return await uoi.find_issued_policies(body or {}, correlation_id=_trace_id(request))
    except UOIUpstreamError as e:
        _raise_upstream(e, _trace_id(request))


# ── Document upload (multipart-in, JSON+base64-out) ──────────────────────────

@app.post("/api/uoi/data/dms/file/upload")
async def dms_file_upload(
    request: Request,
    file: UploadFile = File(...),
    PolicyNo: str = Form(...),
    DocType: str = Form(default="claim_attachment"),
) -> dict[str, Any]:
    """Browser sends a regular multipart upload; this BFF reads the bytes,
    base64-encodes them, and posts InsureMO's JSON shape upstream:
        {"PolicyNo": ..., "DocType": ..., "Base64Content": ...}
    """
    trace_id = _trace_id(request)
    t0 = time.time()
    payload = await file.read()
    if not payload:
        raise HTTPException(status_code=400, detail="Empty upload")
    try:
        resp = await uoi.upload_dms_file(
            policy_no=PolicyNo, doc_type=DocType, file_bytes=payload,
            correlation_id=trace_id,
        )
    except UOIUpstreamError as e:
        _raise_upstream(e, trace_id)
    logger.info(
        "DMS upload OK trace=%s policy=%s docType=%s bytes=%d elapsed_ms=%d",
        trace_id, PolicyNo, DocType, len(payload), int((time.time() - t0) * 1000),
    )
    return JSONResponse(content=resp)


# ── Templated email (used as claim-submission notification) ──────────────────

@app.post("/api/uoi/data/email/send")
async def email_send(request: Request, body: dict[str, Any]) -> Any:
    """InsureMO does not expose a dedicated submitClaim endpoint. Per the
    Postman collection, claim submissions fire a templated email
    (``templateCode: emailAlert``) carrying the policy reference. The
    React Submit Claim button calls this AFTER a successful DMS upload."""
    required = {"Email", "FullName", "ProductCode", "ProductName",
                "ProposalNumber", "templateCode"}
    missing = required - set(body.keys())
    if missing:
        raise HTTPException(
            status_code=400,
            detail=f"email/send missing required fields: {sorted(missing)}",
        )
    try:
        return await uoi.send_email(body, correlation_id=_trace_id(request))
    except UOIUpstreamError as e:
        _raise_upstream(e, _trace_id(request))


# ── Helpers ───────────────────────────────────────────────────────────────────

def _trace_id(request: Request) -> str:
    """Reuse the X-Trace-Id header if the browser sent one; otherwise mint
    one so every BFF→InsureMO call can be tied back to a single browser
    session in logs."""
    return (
        request.headers.get("x-trace-id")
        or f"bff-{int(time.time() * 1000)}-{id(request) & 0xFFFF:04x}"
    )


def _raise_upstream(e: UOIUpstreamError, trace_id: str) -> None:
    """Translate the typed upstream error into the HTTP status the React
    client maps to a friendly message (timeout / unavailable / upstream)."""
    if e.kind == "timeout":
        raise HTTPException(status_code=504, detail={"error": "timeout", "trace_id": trace_id})
    if e.kind == "unavailable":
        raise HTTPException(status_code=503, detail={"error": "unavailable", "trace_id": trace_id})
    raise HTTPException(status_code=502, detail={"error": "upstream", "trace_id": trace_id, "message": str(e)})
