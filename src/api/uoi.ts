// src/api/uoi.ts
// Typed UOI data client. The BFF at /api/uoi/data/* injects the service
// bearer server-side, so this module does NOT handle tokens or auth — it
// only POSTs JSON and surfaces typed errors the UI can render.
//
// USE THIS for every dashboard call. Do NOT use raw fetch for UOI data.

// Sandpack-safe base URL. NEVER use import.meta.env here — Sandpack is not
// Vite and `import.meta` throws at module load.
//
// Resolution priority (most specific → least):
//   1. `?api=<url>` query param — one-off override for this page load
//   2. `localStorage.UOI_API_BASE`  — sticky override (survives refresh)
//   3. `window.__UOI_API_BASE__`    — host-page injection
//   4. Auto-detect localhost         — `http://<host>:5000` so local
//                                      `npm run dev` hits the local BFF
//   5. Default                       — EMPTY STRING → requests become
//                                      same-origin relative paths, which
//                                      vite.config.ts proxies to the public
//                                      UOI BFF. This sidesteps CORS on the
//                                      Jenkins-deployed host.
//
// Why empty default: when API_BASE === "", every call becomes
// `/api/uoi/data/...` (relative). The browser sees same-origin → no CORS
// preflight. Vite's `server.proxy` (and `preview.proxy`) forwards these to
// agent.mck.aidendigital.com server-side. Works for any non-localhost host
// as long as Jenkins runs Vite (dev or preview) with the shipped config.
function _resolveApiBase(): string {
  if (typeof window === "undefined") return "";
  try {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get("api");
    if (qp) return qp.replace(/\/+$/, "");
  } catch { /* noop */ }
  try {
    const ls = window.localStorage?.getItem("UOI_API_BASE");
    if (ls) return ls.replace(/\/+$/, "");
  } catch { /* noop */ }
  const injected = (window as any).__UOI_API_BASE__;
  if (injected) return String(injected).replace(/\/+$/, "");
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "0.0.0.0") {
    return `${window.location.protocol}//${host}:5000`;
  }
  // Non-localhost: rely on Vite proxy to forward /api/* server-side.
  return "";
}
const API_BASE: string = _resolveApiBase();

export class UOIUpstreamError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string, msg: string) {
    super(msg);
    this.name = "UOIUpstreamError";
    this.status = status;
    this.code = code;
  }
}

export class UOITimeoutError extends Error {
  constructor(msg = "The service timed out. Please try again.") {
    super(msg);
    this.name = "UOITimeoutError";
  }
}

export class UOIUnavailableError extends Error {
  constructor(msg = "The service is temporarily unavailable.") {
    super(msg);
    this.name = "UOIUnavailableError";
  }
}

async function postJson<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body ?? {}),
      credentials: "omit",
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw e;
    throw new UOIUnavailableError("Could not reach the service. Check your connection.");
  }
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON upstream */ }

  if (res.ok) return (data ?? {}) as T;

  const detail = data?.detail ?? data ?? {};
  const code: string = detail.error_code ?? "upstream_error";
  const msg: string = detail.error ?? `Request failed (${res.status})`;

  if (res.status === 504 || code === "upstream_timeout") throw new UOITimeoutError(msg);
  if (res.status === 503 || code === "circuit_open") throw new UOIUnavailableError(msg);
  throw new UOIUpstreamError(res.status, code, msg);
}

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "GET",
      headers: { "Accept": "application/json" },
      credentials: "omit",
      signal,
    });
  } catch (e: any) {
    if (e?.name === "AbortError") throw e;
    throw new UOIUnavailableError("Could not reach the service. Check your connection.");
  }
  const text = await res.text();
  let data: any = null;
  try { data = text ? JSON.parse(text) : null; } catch { /* non-JSON upstream */ }
  if (res.ok) return (data ?? {}) as T;
  const detail = data?.detail ?? data ?? {};
  const code: string = detail.error_code ?? "upstream_error";
  const msg: string = detail.error ?? `Request failed (${res.status})`;
  if (res.status === 504 || code === "upstream_timeout") throw new UOITimeoutError(msg);
  if (res.status === 503 || code === "circuit_open") throw new UOIUnavailableError(msg);
  throw new UOIUpstreamError(res.status, code, msg);
}

// ── Dashboard summary ─────────────────────────────────────────────────────
// Fan-out over the four product codes (TR01/HM01/MO01/PA01) handled server-side.
export interface ProductSummary {
  product_code: string;
  product_name: string;
  total: number;
  items: Array<Record<string, unknown>>;
  error: string | null;
}
export interface DashboardSummary {
  products: ProductSummary[];
  generated_at: number;
  trace_id: string;
}
export function fetchDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  return getJson<DashboardSummary>("/api/uoi/data/dashboard/summary", signal);
}

// ── Named data endpoints ──────────────────────────────────────────────────
export interface QueryProposalBody {
  productCode?: string;
  pageSize?: number;
  pageNum?: number;
  [k: string]: unknown;
}
export function queryProposal<T = Record<string, unknown>>(
  body: QueryProposalBody, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/queryProposal", body, signal);
}

export function loadQuote<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/loadQuote", body, signal);
}

export function fetchOrderData<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/fetchOrderData", body, signal);
}

export function fetchMasterData<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/fetchMasterData", body, signal);
}

export function printDocument<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return postJson<T>("/api/uoi/data/printDocument", body, signal);
}

// ── Proposal lifecycle (new-proposal flow: calculate -> save -> issue) ──
// These are WRITE operations. Do not retry client-side; do not cache responses.

export interface CalculateBody {
  ProductCode: string;
  PlanCode?: string;
  [k: string]: unknown;
}
/** Calculate premium for a draft proposal. Call after each user input change
 *  that affects price, debounced. Returns the full premium breakdown. */
export function calculate<T = Record<string, unknown>>(
  body: CalculateBody, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("calculate", body, signal);
}

/** Persist a draft proposal (create or update). Called by the Save button on
 *  the new-proposal / edit-proposal form. Returns the saved ProposalId. */
export function saveProposal<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("saveProposal", body, signal);
}

/** Convert a saved proposal into an issued policy. Called by the
 *  "Submit for Issuance" button on the proposal detail page. */
export function issuePolicy<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("issuePolicy", body, signal);
}

/** Motor-specific: issue a covernote for a motor proposal. */
export function issueCovernote<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("issueCovernote", body, signal);
}

/** Update an issued policy (endorsement flow). Called by the Save button
 *  on the edit-policy form. */
export function updatePolicy<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("updatePolicy", body, signal);
}

// ── Policy reads (safe to call repeatedly; BFF handles retry/cache) ───────

export interface FetchOrderDataBody {
  ProductCode?: string;
  PageSize?: number;
  PageNo?: number;
  OrderId?: string;
  [k: string]: unknown;
}

/** List or fetch issued policies. Single-record detail = pass OrderId;
 *  list by product = pass ProductCode + PageSize + PageNo. */
export function fetchAllOrderData<T = Record<string, unknown>>(
  body: FetchOrderDataBody, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("fetchAllOrderData", body, signal);
}

/** Search issued policies by free-form criteria. Called by the search bar
 *  on the Policies page. */
export function findIssuedPolicies<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("findIssuedPolicies", body, signal);
}

/** Find a policy by customer ID / NRIC. Called by the "Find my policy"
 *  tile on the dashboard or the Policies search. */
export function findPolicyForIdno<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("findPolicyForIdno", body, signal);
}

// ── Reference data (heavily cacheable — UI form dropdowns) ────────────────

/** Fetch a plan's details (coverage limits, excesses, benefits). Called
 *  when the user picks a plan in the new-proposal form. */
export function getPlan<T = Record<string, unknown>>(
  body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("getPlan", body, signal);
}

/** Lookup postal-code → address (Singapore postal service). Called by
 *  the address-autofill field on any form that collects an address. */
export function loadPostalDetails<T = Record<string, unknown>>(
  postal: string, signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("loadPostalDetails", { postal }, signal);
}

// ── Documents (PDFs and DMS file ops) ─────────────────────────────────────

/** Trigger server-side generation + download of a policy PDF. The UI
 *  should open this as a new tab or trigger a browser download. */
export function downloadPolicyDocument(policyId: string): string {
  // Returns a URL the UI can set as an <a href>. BFF streams the PDF.
  return `${API_BASE}/api/uoi/data/passthrough/print/document/policy?policyId=${encodeURIComponent(policyId)}`;
}

/** URL for the motor-proposal covernote PDF. */
export function downloadMotorProposalDocument(proposalId: string): string {
  return `${API_BASE}/api/uoi/data/passthrough/print/document/motorProposal?proposalId=${encodeURIComponent(proposalId)}`;
}

/** URL for a payment-receipt PDF. */
export function downloadPaymentReceipt(receiptId: string): string {
  return `${API_BASE}/api/uoi/data/passthrough/print/payment/receipt?receiptId=${encodeURIComponent(receiptId)}`;
}

/** URL for the "download all docs" zip archive for a policy. */
export function downloadDocumentsZip(policyId: string): string {
  return `${API_BASE}/api/uoi/data/passthrough/dms/file/downloadZip?policyId=${encodeURIComponent(policyId)}`;
}

/** Upload a supporting document (claim docs, ID photos, etc.). `file` is
 *  a File from an <input type="file">. Returns the uploaded file's DMS id. */
export async function uploadDocument<T = Record<string, unknown>>(
  file: File, meta: Record<string, string> = {}, signal?: AbortSignal,
): Promise<T> {
  const form = new FormData();
  form.append("file", file);
  for (const [k, v] of Object.entries(meta)) form.append(k, v);
  const res = await fetch(`${API_BASE}/api/uoi/data/passthrough/dms/file/upload`, {
    method: "POST", body: form, credentials: "omit", signal,
  });
  if (!res.ok) throw new UOIUpstreamError(res.status, "upload_failed", "File upload failed");
  return (await res.json()) as T;
}

// ── Communication ──────────────────────────────────────────────────────────

/** Send an email through UOI's email service. Used by the Claims submission
 *  flow (notify claims team) and by the "Email my policy" button. */
export function sendEmail<T = Record<string, unknown>>(
  body: { to: string | string[]; subject: string; body: string; attachments?: string[] },
  signal?: AbortSignal,
): Promise<T> {
  return uoiPassthrough<T>("email/send", body, signal);
}

// Escape hatch — prefer named endpoints above.
export function uoiPassthrough<T = Record<string, unknown>>(
  upstreamPath: string, body: Record<string, unknown>, signal?: AbortSignal,
): Promise<T> {
  const clean = upstreamPath.replace(/^\/+/, "");
  return postJson<T>(`/api/uoi/data/passthrough/${clean}`, body, signal);
}
