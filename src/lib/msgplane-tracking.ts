/**
 * MsgPlane (or compatible TMS) shipment tracking
 * ------------------------------------------------
 * MsgPlane is a broker CRM; their exact customer-tracking API varies by account.
 * Ask MsgPlane support for:
 *   - The REST URL to look up an order / load by ID (and whether email is required)
 *   - Auth method (Bearer token, API key header, etc.)
 *   - Response JSON shape (status field names)
 *
 * Configure inside `.env.local` on the server (never prefix secrets with NEXT_PUBLIC):
 *
 *   MSGPLANE_TRACKING_API_URL=https://…(from MsgPlane docs)…
 *   MSGPLANE_API_KEY=…                    (optional)
 *   MSGPLANE_AUTH_STYLE=bearer | x-api-key   (defaults to bearer: Authorization Bearer header)
 *   MSGPLANE_TRACKING_HTTP_METHOD=POST|GET  (default POST)
 *   MSGPLANE_ORDER_ID_FIELD=orderId         (JSON/query key for order reference)
 *   MSGPLANE_EMAIL_FIELD=email
 *
 * If MsgPlane gives you a fixed customer URL pattern instead of an API:
 *
 *   MSGPLANE_PUBLIC_TRACKING_URL_TEMPLATE=https://…/track?ref={{orderId}}&e={{email}}
 *
 * Placeholders: {{orderId}}, {{email}} (URL-encoded when expanded).
 */

export class MsgPlaneError extends Error {
  constructor(
    message: string,
    readonly status: number = 502
  ) {
    super(message);
    this.name = "MsgPlaneError";
  }
}

export type NormalizedTracking = {
  orderId: string;
  status: string;
  etaDays: number;
  message: string;
  externalUrl?: string | null;
  source: "msgplane" | "demo";
};

const PHASES = ["booked", "dispatched", "in_transit", "delivered"] as const;

function coercePhase(raw: string | undefined): (typeof PHASES)[number] {
  if (!raw) return "in_transit";
  const lower = raw.toLowerCase().replace(/[\s-]+/g, "_");
  if ((PHASES as readonly string[]).includes(lower))
    return lower as (typeof PHASES)[number];
  if (lower.includes("deliver")) return "delivered";
  if (lower.includes("transit") || lower.includes("picked")) return "in_transit";
  if (lower.includes("dispatch")) return "dispatched";
  if (lower.includes("book") || lower.includes("assigned")) return "booked";
  return "in_transit";
}

function pickString(o: Record<string, unknown>, keys: string[]): string | undefined {
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function pickEta(o: Record<string, unknown>): number {
  const candidates = ["etaDays", "eta_days", "daysUntilDelivery", "eta"];
  for (const k of candidates) {
    const v = o[k];
    if (typeof v === "number" && Number.isFinite(v) && v >= 0)
      return Math.min(30, Math.round(v));
  }
  return 3;
}

export function normalizeMsgPlaneResponse(
  body: unknown,
  fallbackOrderId: string
): Omit<NormalizedTracking, "source"> | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const inner =
    o.data && typeof o.data === "object" ? (o.data as Record<string, unknown>) : o;

  const orderId =
    pickString(inner, ["orderId", "order_id", "reference", "loadId", "load_id"]) ??
    fallbackOrderId;

  const statusRaw = pickString(inner, [
    "status",
    "orderStatus",
    "order_status",
    "phase",
    "shipmentStatus",
    "shipment_status",
  ]);
  const status = coercePhase(statusRaw);

  const message =
    pickString(inner, ["message", "customerMessage", "statusMessage"]) ??
    "Shipment status from MsgPlane.";

  const externalUrl = pickString(inner, [
    "externalUrl",
    "tracking_url",
    "trackingUrl",
    "publicTrackingUrl",
    "customerTrackingUrl",
    "url",
  ]);

  const etaDays = pickEta(inner);

  return { orderId, status, etaDays, message, externalUrl };
}

export function expandPublicTrackingTemplate(
  template: string,
  orderId: string,
  email: string
): string {
  return template
    .replace(/\{\{\s*orderId\s*\}\}/gi, encodeURIComponent(orderId))
    .replace(/\{\{\s*email\s*\}\}/gi, encodeURIComponent(email));
}

export async function fetchMsgPlaneTracking(
  orderId: string,
  email: string
): Promise<Omit<NormalizedTracking, "source">> {
  const apiUrl = process.env.MSGPLANE_TRACKING_API_URL?.trim();
  if (!apiUrl) {
    throw new MsgPlaneError("MsgPlane API URL is not configured.", 500);
  }

  const method = (process.env.MSGPLANE_TRACKING_HTTP_METHOD || "POST")
    .toUpperCase()
    .trim();
  const orderField = process.env.MSGPLANE_ORDER_ID_FIELD || "orderId";
  const emailField = process.env.MSGPLANE_EMAIL_FIELD || "email";

  const headers: Record<string, string> = {};
  const apiKey = process.env.MSGPLANE_API_KEY?.trim();
  if (apiKey) {
    const style = (process.env.MSGPLANE_AUTH_STYLE || "bearer").toLowerCase();
    if (style === "x-api-key") headers["X-API-Key"] = apiKey;
    else headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const url =
    method === "GET"
      ? (() => {
          const u = new URL(apiUrl);
          u.searchParams.set(orderField, orderId);
          u.searchParams.set(emailField, email);
          return u.toString();
        })()
      : apiUrl;

  const init: RequestInit =
    method === "GET"
      ? { method: "GET", headers: { ...headers }, cache: "no-store" }
      : {
          method: "POST",
          headers: { "Content-Type": "application/json", ...headers },
          body: JSON.stringify({
            [orderField]: orderId,
            [emailField]: email,
          }),
          cache: "no-store",
        };

  const res = await fetch(url, init);
  const text = await res.text();
  let json: unknown;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new MsgPlaneError(
      "MsgPlane returned non-JSON. Check MSGPLANE_TRACKING_API_URL and auth.",
      502
    );
  }

  if (!res.ok) {
    const msg =
      typeof json === "object" && json && "error" in json
        ? String((json as { error: unknown }).error)
        : `MsgPlane HTTP ${res.status}`;
    throw new MsgPlaneError(msg, res.status >= 400 && res.status < 600 ? res.status : 502);
  }

  const normalized = normalizeMsgPlaneResponse(json, orderId);
  if (!normalized) {
    throw new MsgPlaneError(
      "Could not read tracking fields from MsgPlane response. Ask MsgPlane for the JSON schema and we can map it.",
      502
    );
  }

  const tpl = process.env.MSGPLANE_PUBLIC_TRACKING_URL_TEMPLATE?.trim();
  const externalUrl =
    normalized.externalUrl ??
    (tpl ? expandPublicTrackingTemplate(tpl, orderId, email) : null);

  return { ...normalized, externalUrl };
}
