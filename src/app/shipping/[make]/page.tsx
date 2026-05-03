import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransportDetailPage } from "@/components/marketing/transport-detail-page";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { getBrandEmblemForSlug } from "@/lib/vehicle-brand-emblem";
import { genericMake, getMake, VEHICLE_MAKES } from "@/lib/vehicle-makes";

type Props = { params: { make: string } };

export const dynamicParams = true;

export function generateStaticParams() {
  return VEHICLE_MAKES.map((m) => ({ make: m.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.make.toLowerCase();
  const m = getMake(slug) ?? genericMake(slug);
  const path = `/shipping/${slug}`;
  const plain = `${m.headline} ${COMPANY.name} dispatches bonded drivers from coast to coast.`;
  return {
    title: pageTitle(`${m.label} auto transport`),
    description: clipMeta(`${m.headline} ${COMPANY.name}.`, 160),
    ...canonicalAndSocial(path, pageTitle(`${m.label} auto transport`), plain),
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

export default function ShippingMakePage({ params }: Props) {
  const slug = params.make.toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  const make = getMake(slug) ?? genericMake(slug);

  const prepChecklist = {
    title: `Before your ${make.label} loads`,
    items: [
      "Keep fuel between a quarter and a half tank unless dispatch says otherwise.",
      "Remove toll tags, garage remotes, and anything loose in the cabin.",
      "Walk the paint in daylight with your phone camera before the truck arrives.",
      "Share alarm quirks, transport mode steps, or air suspension presets.",
      "Tell us about aftermarket wheels, roof racks, or lift kits that change clearance.",
    ],
  };

  return (
    <TransportDetailPage
      eyebrow="Ship by vehicle"
      title={make.headline}
      subtitle={`${make.label} moves nationwide with insured open or enclosed carriers.`}
      hero={make.heroImage}
      prominentBrand={{
        label: make.label,
        emblem: getBrandEmblemForSlug(slug),
      }}
      lead={make.body}
      bullets={make.bullets}
      sections={make.sections}
      prepChecklist={prepChecklist}
      statStrip={statStrip}
      primaryCta={{
        href: "/#instant-quote",
        label: `Quote my ${make.label}`,
      }}
      secondaryCta={{ href: "/vehicles", label: "Vehicle catalog" }}
    />
  );
}
