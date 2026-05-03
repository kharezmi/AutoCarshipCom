import { NextResponse } from "next/server";
import { z } from "zod";
import {
  expandPublicTrackingTemplate,
  fetchMsgPlaneTracking,
  MsgPlaneError,
  type NormalizedTracking,
} from "@/lib/msgplane-tracking";

const bodySchema = z.object({
  orderId: z.string().min(4),
  email: z.string().email(),
});

type Phase = "booked" | "dispatched" | "in_transit" | "delivered";

function demoStatus(orderId: string, email: string): NormalizedTracking {
  const seed = orderId + email;
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (h + seed.charCodeAt(i) * (i + 1)) % 997;
  const phases: Phase[] = [
    "booked",
    "dispatched",
    "in_transit",
    "delivered",
  ];
  const status = phases[h % 4];
  const etaDays = (h % 5) + 1;
  return {
    orderId: orderId.toUpperCase(),
    status,
    etaDays,
    message:
      "Demo mode. For live MsgPlane data, set MSGPLANE_TRACKING_API_URL (and MSGPLANE_API_KEY if required) from MsgPlane support docs. For a hosted portal link only, set MSGPLANE_PUBLIC_TRACKING_URL_TEMPLATE.",
    externalUrl: null,
    source: "demo",
  };
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid order ID and email." },
      { status: 400 }
    );
  }
  const { orderId, email } = parsed.data;
  const oid = orderId.trim();
  const em = email.trim();

  const tpl = process.env.MSGPLANE_PUBLIC_TRACKING_URL_TEMPLATE?.trim();

  if (process.env.MSGPLANE_TRACKING_API_URL?.trim()) {
    try {
      const live = await fetchMsgPlaneTracking(oid, em);
      return NextResponse.json({
        ...live,
        source: "msgplane" as const,
      });
    } catch (e) {
      if (e instanceof MsgPlaneError) {
        return NextResponse.json(
          { error: e.message },
          { status: e.status >= 400 && e.status < 600 ? e.status : 502 }
        );
      }
      console.error(e);
      return NextResponse.json(
        { error: "Tracking service unavailable. Try again or call dispatch." },
        { status: 502 }
      );
    }
  }

  if (tpl) {
    return NextResponse.json({
      orderId: oid.toUpperCase(),
      status: "in_transit",
      etaDays: 0,
      message:
        "Open MsgPlane from the button below for live GPS and dispatcher notes while we finish parsing their API payloads on the server.",
      externalUrl: expandPublicTrackingTemplate(tpl, oid, em),
      source: "msgplane" as const,
    });
  }

  const demo = demoStatus(oid, em);
  return NextResponse.json(demo);
}
