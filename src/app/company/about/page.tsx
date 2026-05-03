import type { Metadata } from "next";
import Link from "next/link";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { COMPANY, PARTNERED_COMPANIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: pageTitle("About us"),
  description: clipMeta(
    `About ${COMPANY.name}: nationwide auto logistics, partner carrier network, and Nine Mile Falls operations office.`,
    160
  ),
  ...canonicalAndSocial(
    "/company/about",
    pageTitle("About us"),
    `${COMPANY.name} publishes clear lane guidance, bonded carrier onboarding, and real dispatch coverage from Washington State.`
  ),
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          About {COMPANY.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">
          We started {COMPANY.name} to deliver clear pricing, reliable pickup
          windows, and consistent communication for every shipment. Our team
          supports private owners, relocation customers, and dealerships with
          nationwide open and enclosed transport options.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-bold text-navy-900">
          Mission
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          Make vehicle logistics as straightforward as booking a flight: honest
          quotes, accountable dispatchers, and technology that keeps shippers
          informed without replacing human judgment.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-bold text-navy-900">
          Headquarters
        </h2>
        <p className="mt-3 text-slate-700">
          {COMPANY.addressLine}, {COMPANY.cityStateZip}
          <br />
          Call us at {COMPANY.phone} during {COMPANY.hours}.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-bold text-navy-900">
          Partnered companies
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {PARTNERED_COMPANIES.map((partner) => (
            <div
              key={partner}
              className="rounded-card border border-slate-200 bg-surface px-4 py-3 text-sm font-semibold text-navy-900"
            >
              {partner}
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/#instant-quote">Get a quote</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/company/faq">Read FAQ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
