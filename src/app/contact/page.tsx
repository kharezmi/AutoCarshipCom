import type { Metadata } from "next";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";
import { ContactLeadForm } from "@/components/contact/contact-lead-form";
import { Phone, Mail, MapPin, Clock3 } from "lucide-react";

export const metadata: Metadata = {
  title: pageTitle("Contact"),
  description: clipMeta(
    `${COMPANY.name} answers vehicle shipping quotes, fleet coordination, and live orders. ${COMPANY.cityStateZip}. Phone ${COMPANY.phone}. ${COMPANY.hours}.`,
    160
  ),
  ...canonicalAndSocial(
    "/contact",
    pageTitle("Contact"),
    `${COMPANY.name} dispatch at ${COMPANY.phone}. Reach us for enclosed or open car shipping schedules.`
  ),
};

export default function ContactPage() {
  const mapSrc =
    "https://maps.google.com/maps?q=18110+US-27+Lake+Wales+FL+33859&hl=en&z=15&output=embed";

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          Contact
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Reach our logistics desk for quotes, fleet programs, and active
          shipments.
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <ContactLeadForm />
          <div className="space-y-6">
            <div className="rounded-card border border-slate-100 bg-white p-6 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-navy-900">
                Direct lines
              </h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-amber-500" />
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="font-semibold text-navy-900 hover:underline"
                  >
                    {COMPANY.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-amber-500" />
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="font-semibold text-navy-900 hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>
                    {COMPANY.addressLine}
                    <br />
                    {COMPANY.cityStateZip}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock3 className="h-5 w-5 shrink-0 text-amber-500" />
                  <span>{COMPANY.hours}</span>
                </li>
              </ul>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Follow us
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <a
                    href={COMPANY.socialFacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-navy-900 hover:underline"
                  >
                    Facebook
                  </a>
                  <a
                    href={COMPANY.socialInstagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-semibold text-navy-900 hover:underline"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-card border border-slate-200 shadow-sm">
              <iframe
                title="AutoCarship office map"
                src={mapSrc}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
