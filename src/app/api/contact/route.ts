import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANY } from "@/lib/constants";
import { appendLead } from "@/lib/leads-store";
import type { ContactLeadData } from "@/lib/leads-types";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  moveType: z.enum(["consumer", "dealer", "other"]),
  origin: z.string().min(2),
  destination: z.string().min(2),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form." }, { status: 400 });
    }
    const v = parsed.data;

    appendLead("contact", v as ContactLeadData);

    const text = [
      `Contact lead (${COMPANY.name})`,
      "",
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Move type: ${v.moveType}`,
      `Origin: ${v.origin}`,
      `Destination: ${v.destination}`,
      v.notes ? `Notes: ${v.notes}` : "",
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
        subject: `Lead: ${v.name} (${v.origin} to ${v.destination})`,
        text,
      });
      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Email delivery failed." },
          { status: 502 }
        );
      }
    } else {
      console.info("[contact | no RESEND_API_KEY]\n", text);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
