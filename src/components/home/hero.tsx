import Image from "next/image";
import { Shield, Star } from "lucide-react";
import { QuoteForm } from "@/components/home/quote-form";
import { COMPANY } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=2000&q=80"
          alt="Car carrier truck on highway"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/40" />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-12 lg:px-6 lg:py-24">
        <div className="max-w-xl text-white">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            {COMPANY.fmcsa}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Nationwide auto transport with transparent pricing
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Open and enclosed carriers, door-to-door coordination, and dispatch
            support from pickup to delivery. Built for dealers, relocations, and
            private owners.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Shield className="h-5 w-5 text-amber-400" />
              <span>Fully insured network</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span>Dispatch follows every load from booking to offload</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-400">
            {COMPANY.dot} · {COMPANY.mc}
          </p>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
