// src/services/dashboardService.ts
// Business-logic layer for the landing dashboard. Components MUST call
// `DashboardService.getSummary()` — never `fetchDashboardSummary()` directly.
//
// Why a service layer:
//   1. Caching + in-flight dedup live here (components stay presentational).
//   2. Response shaping (upstream snake_case → view-model camelCase).
//   3. Single place to change when the BFF shape evolves.

import {
  fetchDashboardSummary,
  fetchOrderData,
  type DashboardSummary as DashboardSummaryRaw,
  type ProductSummary as ProductSummaryRaw,
} from "../api/uoi";

// ── View-model (what components consume) ─────────────────────────────────
export interface DashboardCard {
  productCode: string;      // "TR01" | "HM01" | "MO01" | "PA01"
  productName: string;      // "Travel" | "Home" | "Motor" | "Helper"
  totalPolicies: number;
  hasCoverage: boolean;
  errorMessage: string | null;
  recentItems: DashboardItem[];
}

export interface DashboardItem {
  id: string;
  title: string;
  status?: string;
  raw: Record<string, unknown>;
}

export interface DashboardModel {
  greeting: string;         // "Good morning" | "Good afternoon" | "Good evening"
  userName: string;         // placeholder "there" until profile wired
  cards: DashboardCard[];
  generatedAt: number;
  traceId: string;
}

// ── Cache (in-memory, TTL, dedup) ─────────────────────────────────────────
interface Entry<T> { value: T; expiresAt: number; }
const cache = new Map<string, Entry<unknown>>();
const inflight = new Map<string, Promise<unknown>>();

const TTL_DASHBOARD_MS = 30_000;     // 30s — dashboard is volatile
const TTL_PROPOSAL_LIST_MS = 30_000; // 30s — listings refreshed with dashboard

async function cached<T>(
  key: string, ttlMs: number, fn: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const hit = cache.get(key) as Entry<T> | undefined;
  if (hit && hit.expiresAt > now) return hit.value;
  const existing = inflight.get(key) as Promise<T> | undefined;
  if (existing) return existing;
  const p = fn()
    .then((v) => {
      cache.set(key, { value: v, expiresAt: Date.now() + ttlMs });
      inflight.delete(key);
      return v;
    })
    .catch((e) => { inflight.delete(key); throw e; });
  inflight.set(key, p);
  return p;
}

// ── Public API ────────────────────────────────────────────────────────────
export const DashboardService = {
  async getSummary(signal?: AbortSignal): Promise<DashboardModel> {
    return cached("dashboard:summary", TTL_DASHBOARD_MS, async () => {
      const raw = await fetchDashboardSummary(signal);
      return shapeDashboard(raw);
    });
  },

  async refreshSummary(signal?: AbortSignal): Promise<DashboardModel> {
    cache.delete("dashboard:summary");
    return this.getSummary(signal);
  },

  // Per SCRUM-19 Epic 3.1 — listings use fetchOrderData with capitalized
  // body keys. PageSize is fixed at 4 for the dashboard-card path (we only
  // need to know if at least one in-force policy exists). Pass a larger
  // PageSize from the product-detail page when more rows are needed.
  async listByProduct(productCode: string, signal?: AbortSignal) {
    return cached(`dashboard:policies:${productCode}`, TTL_PROPOSAL_LIST_MS, () =>
      fetchOrderData({ ProductCode: productCode, PageSize: 4, PageNo: 1 }, signal),
    );
  },

  // Call on logout or user-triggered refresh to drop all cached state.
  invalidate(): void {
    cache.clear();
    inflight.clear();
  },
};

// ── Shaping helpers ──────────────────────────────────────────────────────
function shapeDashboard(raw: DashboardSummaryRaw): DashboardModel {
  const cards = (raw?.products ?? []).map(shapeCard);
  return {
    greeting: deriveGreeting(),
    userName: "there",
    cards,
    generatedAt: Number(raw?.generated_at ?? Date.now()),
    traceId: String(raw?.trace_id ?? ""),
  };
}

function shapeCard(p: ProductSummaryRaw): DashboardCard {
  const total = Number(p?.total ?? 0);
  return {
    productCode: String(p?.product_code ?? ""),
    productName: String(p?.product_name ?? ""),
    totalPolicies: total,
    hasCoverage: total > 0,
    errorMessage: p?.error ?? null,
    recentItems: Array.isArray(p?.items) ? p.items.slice(0, 3).map(shapeItem) : [],
  };
}

function shapeItem(it: Record<string, unknown>): DashboardItem {
  const id = String(
    it["id"] ?? it["proposalId"] ?? it["quoteId"] ?? it["policyId"] ?? "",
  );
  const title = String(
    it["productName"] ?? it["title"] ?? it["proposalNo"] ?? it["policyNo"] ?? "Policy",
  );
  const status = it["status"] ?? it["policyStatus"] ?? it["proposalStatus"];
  return {
    id, title,
    status: typeof status === "string" ? status : undefined,
    raw: it,
  };
}

function deriveGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}
