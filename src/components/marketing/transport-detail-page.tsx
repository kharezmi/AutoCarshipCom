import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone } from "lucide-react";
import { BrandEmblemMark } from "@/components/marketing/brand-emblem";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import type { RichImage, RichSection, StatChip } from "@/lib/content-types";
import type { BrandEmblem } from "@/lib/vehicle-brand-emblem";
import { cn } from "@/lib/utils";

export type TransportDetailPageProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  hero: RichImage;
  /** When set, the hero is a brand-first layout (emblem + gradient) instead of a stock photo. */
  prominentBrand?: { label: string; emblem: BrandEmblem | null };
  lead: string;
  bullets: string[];
  sections: RichSection[];
  prepChecklist: { title: string; items: string[] };
  statStrip?: StatChip[];
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
};

export function TransportDetailPage({
  eyebrow,
  title,
  subtitle,
  hero,
  prominentBrand,
  lead,
  bullets,
  sections,
  prepChecklist,
  statStrip,
  primaryCta,
  secondaryCta,
}: TransportDetailPageProps) {
  return (
    <article className="bg-white">
      <section
        className={cn(
          "relative min-h-[360px] md:min-h-[420px]",
          prominentBrand
            ? "bg-gradient-to-br from-navy-950 via-navy-900 to-[#0f172a]"
            : ""
        )}
      >
        {!prominentBrand ? (
          <>
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-900/25" />
          </>
        ) : (
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden
          >
            <svg className="h-full w-full">
              <defs>
                <pattern
                  id="shipGrid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M32 0H0V32"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#shipGrid)" />
            </svg>
          </div>
        )}
        <div
          className={cn(
            "relative mx-auto flex max-w-6xl flex-col px-4 pb-10 pt-24 md:pb-14 lg:px-6",
            prominentBrand
              ? "min-h-[360px] justify-center gap-10 md:min-h-[420px] md:flex-row md:items-center md:justify-between md:gap-14"
              : "min-h-[360px] justify-end md:min-h-[420px]"
          )}
        >
          {prominentBrand ? (
            <BrandEmblemMark
              emblem={prominentBrand.emblem}
              label={prominentBrand.label}
              size="xl"
              className="mx-auto md:mx-0"
            />
          ) : null}
          <div className={prominentBrand ? "md:min-w-0 md:flex-1" : ""}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-200">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-lg">
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              {secondaryCta ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/50 bg-white/10 text-white hover:bg-white/20"
              >
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="inline-flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {COMPANY.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {statStrip && statStrip.length > 0 ? (
        <div className="border-b border-slate-200 bg-surface">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 lg:px-6">
            {statStrip.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm"
              >
                <p className="font-heading text-2xl font-bold text-navy-900">
                  {s.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-slate-700">{lead}</p>
          </div>
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              At a glance
            </p>
            <ul className="mt-4 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-surface p-4 text-sm text-slate-800 shadow-sm"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                    aria-hidden
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-0">
          {sections.map((section, i) => {
            const hasImage = Boolean(section.image);
            if (!hasImage) {
              return (
                <div
                  key={section.title}
                  className={cn(
                    "border-t border-slate-200 py-14 first:border-t-0 first:pt-0",
                    i % 2 === 1 ? "bg-surface/60" : ""
                  )}
                >
                  <div className="max-w-3xl">
                    <h2 className="font-heading text-2xl font-bold text-navy-900 md:text-3xl">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                </div>
              );
            }
            const reverse = i % 2 === 1;
            return (
              <div
                key={section.title}
                className={cn(
                  "border-t border-slate-200 py-14",
                  i % 2 === 0 ? "bg-white" : "bg-surface/60"
                )}
              >
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                  <div className={reverse ? "lg:order-2" : ""}>
                    <h2 className="font-heading text-2xl font-bold text-navy-900 md:text-3xl">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 shadow-card",
                      reverse ? "lg:order-1" : ""
                    )}
                  >
                    <Image
                      src={section.image!.src}
                      alt={section.image!.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-navy-900/10 bg-navy-950 px-6 py-10 text-white shadow-xl md:px-10 md:py-12">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">
            {prepChecklist.title}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {prepChecklist.items.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-slate-200">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-slate-200 pt-12">
          <Button asChild size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </Button>
          {secondaryCta ? (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
