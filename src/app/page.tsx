import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { ServicesStrip } from "@/components/home/services-strip";
import { WhyChooseUs } from "@/components/home/why-choose";
import { PartneredCompanies } from "@/components/home/partnered-companies";
import { HomeNextSteps } from "@/components/home/home-next-steps";
import { HomeComparison } from "@/components/home/home-comparison";
import { HomePricingBands } from "@/components/home/home-pricing-bands";
import { HomeSocialProof } from "@/components/home/home-social-proof";
import { HomeFinalCta } from "@/components/home/home-final-cta";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta } from "@/lib/metadata";

const homeTitle = `${COMPANY.name} | Nationwide vehicle shipping quotes`;

export const metadata: Metadata = {
  title: homeTitle,
  description: clipMeta(
    `Licensed auto transport broker: open and enclosed nationwide. Phone ${COMPANY.phone}. ${COMPANY.dot}; ${COMPANY.mc}. ${COMPANY.fmcsa}. ${COMPANY.hours}.`,
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
      <HomeNextSteps />
      <HowItWorks />
      <HomeComparison />
      <HomePricingBands />
      <WhyChooseUs />
      <HomeSocialProof />
      <PartneredCompanies />
      <HomeFinalCta />
    </>
  );
}
