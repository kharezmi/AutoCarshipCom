import type { Metadata } from "next";
import type { ReactNode } from "react";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageTitle("Privacy Policy"),
  description: clipMeta(
    "Privacy Policy for Auto Car Ship LLC (a registered trade name of Auto Haul Express LLC).",
    160
  ),
  ...canonicalAndSocial(
    "/company/privacy",
    pageTitle("Privacy Policy"),
    "Privacy Policy for Auto Car Ship LLC."
  ),
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-10 scroll-mt-20 font-heading text-xl font-bold text-navy-900 first:mt-0">
      {children}
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-14 leading-relaxed text-slate-700 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          PRIVACY POLICY
        </h1>

        <p>
          This Privacy Policy applies to Auto Car Ship LLC (a registered trade
          name of Auto Haul Express LLC)
        </p>

        <H2>1. Information We Collect</H2>
        <p>
          We collect information you provide directly to us, including your
          name, email address, and phone number when you request a vehicle
          shipping quote or book a service.
        </p>

        <H2>2. Use of Information</H2>
        <p className="mb-3">We use the information collected to:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Provide, maintain, and improve our shipping services.</li>
          <li>
            Send you shipping quotes, administrative updates, and order
            confirmations.
          </li>
          <li>Communicate with you via SMS or email regarding your orders.</li>
        </ul>

        <H2>3. Information Sharing and Disclosure</H2>
        <p>
          Mobile Opt-in, SMS Consent, and phone numbers collected for SMS
          communication purposes will not be shared with any third party or
          affiliates for marketing purposes.
        </p>
        <p>
          We do not sell, rent, or share your mobile information with third
          parties for their promotional or marketing needs.
        </p>
        <p>
          Your consent to receive SMS messages is used strictly for
          communication between you and Auto Car Ship LLC.
        </p>

        <H2>4. Third-Party Disclosure</H2>
        <p>
          We may share your non-mobile information with licensed motor carriers
          only to facilitate the transportation of your vehicle.
        </p>

        <H2>5. Data Security</H2>
        <p>
          We implement a variety of security measures to maintain the safety of
          your personal information.
        </p>
        <p>
          However, no method of transmission over the Internet or mobile networks
          is 100% secure.
        </p>

        <H2>6. Opt-Out Rights</H2>
        <p>
          You may opt-out of receiving promotional emails or SMS messages at any
          time by following the &quot;STOP&quot; instructions in the messages or
          contacting us at{" "}
          <a
            href="mailto:admin@autocarship.com"
            className="text-navy-800 underline underline-offset-2 hover:text-amber-700"
          >
            admin@autocarship.com
          </a>
          .
        </p>

        <H2>7. Contact Us</H2>
        <p>If you have questions about this Privacy Policy, please contact:</p>
        <p>Auto Car Ship LLC</p>
        <p>
          {COMPANY.addressLine}
          <br />
          {COMPANY.cityStateZip}
        </p>
      </div>
    </div>
  );
}
