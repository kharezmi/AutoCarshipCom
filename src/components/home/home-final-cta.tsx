import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

export function HomeFinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-slate-950 py-20 text-white lg:py-28">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-6">
        <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
          Need a number for your route?
        </h2>
        <p className="mt-4 text-lg text-slate-200">
          Use the quote form or call {COMPANY.phone} ({COMPANY.hours.toLowerCase()}).
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-[200px] bg-amber-500 text-navy-950 hover:bg-amber-400">
            <a href="/#instant-quote">Get instant quote</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="min-w-[200px] border-white/40 bg-white/5 text-white hover:bg-white/10"
          >
            <a href={`tel:${COMPANY.phoneTel}`} className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          <Link href="/contact" className="font-semibold text-amber-300 underline-offset-2 hover:underline">
            Contact form
          </Link>{" "}
          for multi-vehicle or dealer programs.
        </p>
      </div>
    </section>
  );
}
