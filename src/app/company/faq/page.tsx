import type { Metadata } from "next";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageTitle("FAQ"),
  description: clipMeta(
    `Auto transport FAQ covering pricing, open vs enclosed trailers, insurance, and timelines for ${COMPANY.name} customers.`,
    160
  ),
  ...canonicalAndSocial(
    "/company/faq",
    pageTitle("FAQ"),
    `Plain-language answers on booking, carrier insurance, and paperwork for ${COMPANY.name} shipments.`
  ),
};

const faqs = [
  {
    q: "How far in advance should I book?",
    a: "Popular lanes fill quickly during summer and snowbird season. Two weeks is ideal; we can often accommodate expedited moves within a few days depending on equipment.",
  },
  {
    q: "What is the difference between open and enclosed?",
    a: "Open trailers are the standard multi-vehicle carriers you see on the highway. That option stays cost effective and easy to schedule. Enclosed trailers keep weather and debris off the sheet metal, so we recommend them for luxury, exotic, and many classic vehicles.",
  },
  {
    q: "Do I pay everything upfront?",
    a: "Payment terms vary by carrier and lane. Your coordinator explains deposit or pay-on-delivery options before you sign the order.",
  },
  {
    q: "Can you ship inoperable vehicles?",
    a: "Yes, with a winch or roll-back when arranged in advance. Inoperable moves typically include an additional fee to cover extra labor and equipment.",
  },
  {
    q: "Is my quote guaranteed?",
    a: "Online quotes are estimates based on mileage and the options you select. Final pricing is confirmed in writing once vehicle details and access constraints are verified.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">FAQ</h1>
        <p className="mt-3 text-slate-600">
          Answers for shippers working with {COMPANY.name}. This FAQ also emits
          structured data for Google rich results.
        </p>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
