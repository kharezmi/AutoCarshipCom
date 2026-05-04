import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, Shield, Sparkles } from "lucide-react";
import { QuoteForm } from "@/components/home/quote-form";
import { COMPANY } from "@/lib/constants";

const bullets = [
  "Ballpark price in the form before you book",
  "Open or enclosed in one quote flow",
  "FMCSA broker. We match you with insured carriers",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80"
          alt="Car carrier truck on highway at dusk"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/95 to-navy-900/75" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/12 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-10 lg:px-6 lg:pb-10 lg:pt-14">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" aria-hidden />
            Dealers and private owners, US lanes
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline">|</span>
          <span className="text-xs font-medium text-slate-300">{COMPANY.dot}</span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs font-medium text-slate-300">{COMPANY.mc}</span>
          <span className="text-xs text-slate-500">|</span>
          <span className="text-xs text-slate-400">{COMPANY.fmcsa}</span>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-14">
          <div className="max-w-xl text-white">
            <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.25rem]">
              Car shipping quotes for moves anywhere in the U.S.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-200">
              We are a licensed broker: we book loads with motor carriers and stay on the line for pickup and delivery.
              Use the form for a quick estimate, or call us.
            </p>
            <ul className="mt-8 space-y-3">
              {bullets.map((line) => (
                <li key={line} className="flex gap-3 text-sm font-medium text-slate-100 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 shadow-lg shadow-amber-900/20 transition hover:bg-amber-400"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call {COMPANY.phone}
              </a>
              <p className="text-xs text-slate-400">
                {COMPANY.hours}
                <span className="mx-2 text-slate-600">|</span>
                <Link href="/contact" className="font-semibold text-amber-300 hover:underline">
                  Contact
                </Link>
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm backdrop-blur">
                <Shield className="h-5 w-5 text-amber-400" aria-hidden />
                <span>Cargo coverage through the assigned carrier</span>
              </div>
            </div>
          </div>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
