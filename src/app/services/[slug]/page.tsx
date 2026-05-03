import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransportDetailPage } from "@/components/marketing/transport-detail-page";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { SERVICE_BY_SLUG } from "@/lib/services-catalog";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return Object.keys(SERVICE_BY_SLUG).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const s = SERVICE_BY_SLUG[params.slug];
  if (!s) return { title: "Service" };
  const path = `/services/${params.slug}`;
  const plain = `${s.short} ${COMPANY.name} coordinates insured carriers nationwide.`;
  return {
    title: pageTitle(s.title),
    description: clipMeta(plain, 160),
    ...canonicalAndSocial(path, pageTitle(s.title), plain),
  };
}

const statStrip = [
  {
    value: COMPANY.dot.replace(/^US DOT:\s*/i, "").trim(),
    label: "USDOT",
  },
  {
    value: COMPANY.mc.replace(/^MC:\s*/i, "").trim(),
    label: "MC",
  },
  {
    value: COMPANY.phone,
    label: "Dispatch",
  },
];

export default function ServiceDetailPage({ params }: Props) {
  const service = SERVICE_BY_SLUG[params.slug];
  if (!service) notFound();

  return (
    <TransportDetailPage
      eyebrow="Service"
      title={service.title}
      subtitle={service.short}
      hero={service.heroImage}
      lead={service.description}
      bullets={service.highlights}
      sections={service.sections}
      prepChecklist={service.prepChecklist}
      statStrip={statStrip}
      primaryCta={{ href: "/#instant-quote", label: "Get a written estimate" }}
      secondaryCta={{ href: "/services", label: "Compare services" }}
    />
  );
}
