import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/services-catalog";

export function ServicesStrip() {
  return (
    <section className="border-y border-slate-200/80 bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
              Transport modes
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
              Pick how your vehicle rides
            </h2>
            <p className="mt-3 max-w-xl text-slate-600">
              Open, enclosed, door-to-door, and specialty moves. Each page lists prep items for that mode.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-amber-700 hover:text-amber-600"
          >
            All services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-navy-950 shadow-md transition duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-xl"
            >
              <div className="absolute inset-0">
                <Image
                  src={s.heroImage.src}
                  alt={s.heroImage.alt}
                  fill
                  className="object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-65"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-900/20" />
              </div>
              <div className="relative mt-auto p-5">
                <p className="font-heading text-lg font-bold leading-tight text-white">{s.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-200">{s.short}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-amber-400">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
