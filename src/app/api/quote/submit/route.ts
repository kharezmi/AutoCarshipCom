import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANY } from "@/lib/constants";
import { appendLead } from "@/lib/leads-store";
import type { QuoteLeadData } from "@/lib/leads-types";

const quoteSchema = z.object({
  originZip: z.string(),
  destZip: z.string(),
  vehicleYear: z.string(),
  vehicleMake: z.string(),
  vehicleModel: z.string(),
  condition: z.enum(["running", "inoperable"]),
  transportType: z.enum(["open", "enclosed"]),
  shipDate: z.string(),
  expedited: z.boolean(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  smsConsent: z
    .boolean()
    .refine((v) => v === true, { message: "SMS consent required." }),
  miles: z.number().optional(),
  estimatedTotal: z.number().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = quoteSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid quote payload." }, { status: 400 });
    }
    const q = parsed.data;

    appendLead("quote", q as QuoteLeadData);

    const lines = [
      `New quote request (${COMPANY.name})`,
      "",
      `Name: ${q.name}`,
      `Phone: ${q.phone}`,
      `Email: ${q.email}`,
      "",
      `From ZIP: ${q.originZip} to ZIP: ${q.destZip}`,
      q.miles != null ? `Est. miles: ${q.miles}` : "",
      `Vehicle: ${q.vehicleYear} ${q.vehicleMake} ${q.vehicleModel}`,
      `Condition: ${q.condition}`,
      `Transport: ${q.transportType}`,
      `First available ship date: ${q.shipDate}`,
      `Expedited: ${q.expedited ? "Yes" : "No"}`,
      `SMS consent (TCPA): Yes`,
      q.estimatedTotal != null ? `Ballpark total: $${q.estimatedTotal}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.QUOTE_NOTIFY_EMAIL ?? COMPANY.email;
    const from =
      process.env.RESEND_FROM_EMAIL ?? "AutoCarship <onboarding@resend.dev>";

    if (apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject: `Quote: ${q.vehicleYear} ${q.vehicleMake} (${q.originZip} to ${q.destZip})`,
        text: lines,
      });
      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Email delivery failed. Call us to complete your quote." },
          { status: 502 }
        );
      }
    } else {
      console.info("[quote submit | no RESEND_API_KEY]\n", lines);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
