import type { Metadata } from "next";
import Link from "next/link";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { COMPANY, PARTNERED_COMPANIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: pageTitle("About us"),
  description: clipMeta(
    `About ${COMPANY.name}: nationwide auto transport broker, Lake Wales, FL office, FMCSA licensed.`,
    160
  ),
  ...canonicalAndSocial(
    "/company/about",
    pageTitle("About us"),
    `${COMPANY.name} is a licensed Florida broker: quotes, carrier assignment, dispatch.`
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
          {COMPANY.name} is an auto transport broker in Lake Wales, FL. We set up
          moves between customers and FMCSA-registered trucking companies, open or
          enclosed, residential or dealer. Private owners and dealers use us for
          one-off cars and small batches.
        </p>
        <h2 className="mt-12 font-heading text-2xl font-bold text-navy-900">
          Mission
        </h2>
        <p className="mt-3 text-slate-700 leading-relaxed">
          Straight quotes, paperwork that matches the truck, and someone on the
          phone when the schedule slips.
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
