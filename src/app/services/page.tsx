import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { SERVICES } from "@/lib/services-catalog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: pageTitle("Services"),
  description: clipMeta(
    `Door-to-door car shipping programs from ${COMPANY.name}: open ramps, enclosed paint protection, motorcycles, exotic moves, nationwide dispatch.`,
    160
  ),
  ...canonicalAndSocial(
    "/services",
    pageTitle("Services"),
    `${COMPANY.name} lists each transport mode with sample rate bands and insured carrier checkpoints.`
  ),
};

function PricingTables() {
  return (
    <Tabs defaultValue="regional" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="regional">Under 500 mi</TabsTrigger>
        <TabsTrigger value="long">Cross-country</TabsTrigger>
      </TabsList>
      <TabsContent value="regional">
        <div className="overflow-hidden rounded-card border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900 text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Distance</th>
                <th className="px-4 py-3 font-heading">Open (estimated)</th>
                <th className="px-4 py-3 font-heading">Enclosed (estimated)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="px-4 py-3">1-100 mi</td>
                <td className="px-4 py-3">$399-$549</td>
                <td className="px-4 py-3">$599-$799</td>
              </tr>
              <tr>
                <td className="px-4 py-3">101-300 mi</td>
                <td className="px-4 py-3">$549-$899</td>
                <td className="px-4 py-3">$799-$1,199</td>
              </tr>
              <tr>
                <td className="px-4 py-3">301-500 mi</td>
                <td className="px-4 py-3">$799-$1,199</td>
                <td className="px-4 py-3">$1,199-$1,599</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Figures are estimated market ranges. Your instant quote reflects
          current lanes, fuel, and equipment.
        </p>
      </TabsContent>
      <TabsContent value="long">
        <div className="overflow-hidden rounded-card border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-900 text-white">
              <tr>
                <th className="px-4 py-3 font-heading">Lane</th>
                <th className="px-4 py-3 font-heading">Open (estimated)</th>
                <th className="px-4 py-3 font-heading">Enclosed (estimated)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr>
                <td className="px-4 py-3">Coast-to-coast</td>
                <td className="px-4 py-3">$1,199-$1,799</td>
                <td className="px-4 py-3">$1,799-$2,499</td>
              </tr>
              <tr>
                <td className="px-4 py-3">North-South (e.g. NY-FL)</td>
                <td className="px-4 py-3">$899-$1,399</td>
                <td className="px-4 py-3">$1,399-$1,899</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Central US hubs</td>
                <td className="px-4 py-3">$799-$1,199</td>
                <td className="px-4 py-3">$1,199-$1,699</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Seasonality and oversized loads can change totals. Submit the instant quote for your ZIP pairing.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export default function ServicesIndexPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          Services
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          AutoCarship LLC books vetted carriers for open moves, enclosed
          protection, door-to-door coordination, exotics, and motorcycles.
        </p>

        <div className="mt-12 max-w-3xl">
          <h2 className="font-heading text-2xl font-bold text-navy-900">
            Sample pricing bands
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Use these tables to sanity-check your quote. Actual totals depend on
            equipment, season, and vehicle specifics.
          </p>
          <div className="mt-6">
            <PricingTables />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card
              key={s.slug}
              className="group flex flex-col overflow-hidden border-slate-200 shadow-sm transition hover:border-amber-200 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <Image
                  src={s.heroImage.src}
                  alt={s.heroImage.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <p className="absolute bottom-3 left-4 right-4 font-heading text-lg font-bold text-white drop-shadow">
                  {s.title}
                </p>
              </div>
              <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-5">
                <p className="text-sm text-slate-600">{s.short}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-auto pt-6 text-sm font-bold text-amber-600 hover:text-amber-500"
                >
                  View service details
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
