import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesStrip } from "@/components/home/services-strip";
import { WhyChooseUs } from "@/components/home/why-choose";
import { PartneredCompanies } from "@/components/home/partnered-companies";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta } from "@/lib/metadata";

const homeTitle = `${COMPANY.name} | Nationwide vehicle shipping quotes`;

export const metadata: Metadata = {
  title: homeTitle,
  description: clipMeta(
    `Nationwide open and enclosed vehicle shipping with WA-based dispatch. Phone ${COMPANY.phone}. ${COMPANY.dot}; ${COMPANY.mc}. ${COMPANY.hours}.`,
    160
  ),
  ...canonicalAndSocial(
    "/",
    homeTitle,
    `Compare open vs enclosed car shipping costs in minutes. Speak with ${COMPANY.name} at ${COMPANY.phone}.`
  ),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <HowItWorks />
      <WhyChooseUs />
      <PartneredCompanies />
      <section className="bg-navy-900 py-16 text-center text-white lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            Ready when you are
          </h2>
          <p className="mt-3 text-slate-200">
            Get a quote online or speak with a logistics coordinator today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="/#instant-quote">Start instant quote</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
