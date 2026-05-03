import { NextResponse } from "next/server";
import { z } from "zod";
import { haversineMiles } from "@/lib/quote-pricing";

const bodySchema = z.object({
  originZip: z.string().regex(/^\d{5}(-\d{4})?$/),
  destZip: z.string().regex(/^\d{5}(-\d{4})?$/),
});

async function zipLatLon(zip: string) {
  const base = zip.replace(/\D/g, "").slice(0, 5);
  const res = await fetch(`https://api.zippopotam.us/us/${base}`, {
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    places: { latitude: string; longitude: string }[];
  };
  const p = data.places?.[0];
  if (!p) return null;
  return {
    lat: parseFloat(p.latitude),
    lon: parseFloat(p.longitude),
  };
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid ZIP codes." },
        { status: 400 }
      );
    }
    const { originZip, destZip } = parsed.data;
    const [a, b] = await Promise.all([
      zipLatLon(originZip),
      zipLatLon(destZip),
    ]);
    if (!a || !b) {
      return NextResponse.json(
        {
          error:
            "Could not resolve one or both ZIP codes. Check the codes and try again.",
        },
        { status: 422 }
      );
    }
    const miles = Math.round(haversineMiles(a.lat, a.lon, b.lat, b.lon) * 1.12);
    return NextResponse.json({ miles: Math.max(50, miles) });
  } catch {
    return NextResponse.json(
      { error: "Distance lookup failed. Try again shortly." },
      { status: 500 }
    );
  }
}
