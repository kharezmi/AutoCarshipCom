import type { Metadata } from "next";
import Link from "next/link";
import { BrandEmblemMark } from "@/components/marketing/brand-emblem";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { getBrandEmblemForSlug } from "@/lib/vehicle-brand-emblem";
import { VEHICLE_MAKES } from "@/lib/vehicle-makes";

export const metadata: Metadata = {
  title: pageTitle("Shipping by make"),
  description: clipMeta(
    "Manufacturer-specific car shipping guides for Tesla, BMW, Ford, and more. Routes, coverage, and quoting from AutoCarship LLC.",
    160
  ),
  ...canonicalAndSocial(
    "/vehicles",
    pageTitle("Shipping by make"),
    "Find make-by-make car transport pages for popular brands. Read how we load, insure, and dispatch each build."
  ),
};

export default function VehiclesCatalogPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          Shipping by make
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Explore dedicated guides for popular manufacturers. Each page
          outlines how we protect your vehicle and what to expect on the lane.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {VEHICLE_MAKES.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/shipping/${m.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-slate-100 bg-white shadow-sm transition hover:border-amber-300 hover:shadow-md"
              >
                <div className="flex h-40 w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0c1222] px-4 py-4">
                  <BrandEmblemMark
                    emblem={getBrandEmblemForSlug(m.slug)}
                    label={m.label}
                    size="lg"
                  />
                  <span className="text-center font-heading text-lg font-bold leading-tight text-white drop-shadow-sm">
                    {m.label}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-sm text-slate-600 line-clamp-2">
                    {m.headline}
                  </span>
                  <span className="mt-4 text-xs font-bold text-amber-600">
                    View shipping guide
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
