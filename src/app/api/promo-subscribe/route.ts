import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANY } from "@/lib/constants";
import { appendPromoSubscriber } from "@/lib/promo-subscribers-store";

const schema = z.object({
  email: z.string().email(),
  name: z.string().max(120).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }
    const { email, name } = parsed.data;
    const nameTrim = name?.trim() || null;

    appendPromoSubscriber(email, nameTrim);

    const lines = [
      `Promo / newsletter signup (${COMPANY.name})`,
      "",
      `Email: ${email}`,
      nameTrim ? `Name: ${nameTrim}` : "Name: (not provided)",
      "",
      "Source: promo modal (10% offer interest)",
    ].join("\n");

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.QUOTE_NOTIFY_EMAIL ?? COMPANY.email;
    const from =
      process.env.RESEND_FROM_EMAIL ?? "AutoCarship <onboarding@resend.dev>";

    if (apiKey) {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        subject: `Promo signup: ${email}`,
        text: lines,
      });
      if (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Could not complete signup. Try again or call us." },
          { status: 502 }
        );
      }
    } else {
      console.info("[promo-subscribe | no RESEND_API_KEY]\n", lines);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
