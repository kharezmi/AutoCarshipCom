import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services-catalog";

export function ServicesStrip() {
  return (
    <section className="border-y border-slate-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-heading text-3xl font-bold text-navy-900">
              Fleet capabilities
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              From daily drivers to enclosed exotics, pick the haul type that fits
              your timeline and clearance needs.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-500"
          >
            Services overview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 scrollbar-thin sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-5">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="min-w-[220px] shrink-0 rounded-card border border-slate-100 bg-surface p-5 shadow-sm transition hover:border-amber-300 hover:shadow-md sm:min-w-0"
            >
              <p className="font-heading text-base font-bold text-navy-900">
                {s.title}
              </p>
              <p className="mt-2 line-clamp-3 text-xs text-slate-600">
                {s.short}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
