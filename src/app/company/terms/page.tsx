import type { Metadata } from "next";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";

export const metadata: Metadata = {
  title: pageTitle("Terms and Conditions"),
  description: clipMeta(
    "Terms and Conditions for Auto Car Ship LLC (a registered trade name of Auto Haul Express LLC).",
    160
  ),
  ...canonicalAndSocial(
    "/company/terms",
    pageTitle("Terms and Conditions"),
    "Terms and Conditions for Auto Car Ship LLC."
  ),
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-14 leading-relaxed text-slate-700 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">
          TERMS AND CONDITIONS
        </h1>

        <p>
          These Terms and Conditions apply to Auto Car Ship LLC (a registered
          trade name of Auto Haul Express LLC)
        </p>

        <h2 className="mt-10 scroll-mt-20 font-heading text-xl font-bold text-navy-900">
          1. Introduction
        </h2>
        <p>
          These terms and conditions govern the contractual relationship between
          Auto Car Ship LLC (referred to as &quot;the Company,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;) and the customer (referred to as
          &quot;you&quot; or &quot;your&quot;) for the transportation of
          vehicles.
        </p>
        <p>
          Please ensure that you thoroughly review all the terms and conditions
          outlined in this document before using our services. By requesting a
          quote or booking a shipment, you agree to be bound by these terms.
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          2. Service Description
        </h2>
        <p>
          Auto Car Ship LLC (a registered trade name of Auto Haul Express LLC) is
          a licensed property transportation broker (US DOT: 4197700, MC:
          1618777). We arrange the transportation of vehicles via licensed motor
          carriers. We do not transport the vehicles ourselves; we act solely as
          a broker between the customer and the carrier.
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          3. SMS Terms &amp; Conditions
        </h2>
        <p>
          SMS Consent Communication: The information (Phone Numbers) obtained
          as part of the SMS consent process will not be shared with third
          parties or affiliates for marketing purposes.
        </p>
        <p className="mb-2">Types of SMS Communications:</p>
        <p>
          If you have consented to receive text messages from Auto Car Ship
          LLC(a registered trade name of Auto Haul Express LLC) , you may
          receive messages related to the following:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Customer care.</li>
          <li>Follow-up messages regarding your inquiry.</li>
          <li>Booking shipments.</li>
        </ul>
        <p className="mt-4">
          Example Message: &quot;Hello, this is a friendly update from Auto Car
          Ship LLC regarding your vehicle shipment quote. A carrier has been
          assigned for pickup on [Date]. Reply STOP to opt out of SMS messaging
          from Auto Car Ship LLC at any time.&quot;
        </p>
        <p>
          Message Frequency: Message frequency may vary depending on the type of
          communication. For example, you may receive up to 7-10 SMS messages
          per week related to your [customer care/follow-up messages, etc.].
          Example: &quot;Message frequency may vary. You may receive up to 2 SMS
          messages per week regarding your appointments or account status.&quot;
        </p>
        <p>
          Potential Fees for SMS Messaging: Please note that standard message
          and data rates may apply, depending on your carrier&apos;s pricing plan.
          These fees may vary if the message is sent domestically or
          internationally. These fees are charged by your carrier, not by Auto
          Car Ship LLC.
        </p>
        <p className="mb-2">Opt-In Method:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            You may option to receive SMS messages from Auto Haul Express LLC by
            submitting an online form
          </li>
        </ul>
        <p className="mt-4 mb-2">Opt-Out Method:</p>
        <p>
          You can opt out of receiving SMS messages at any time. To do so,
          simply reply &quot;STOP&quot; to any SMS message you receive.
          Alternatively, you can contact us directly to request removal from our
          messaging list. After you send the SMS message &quot;STOP&quot; to us,
          we will send you an SMS message to confirm that you have been
          unsubscribed.
        </p>
        <p className="mt-4 mb-2">Help &amp; Support:</p>
        <p>
          If you are experiencing any issues, you can reply with the keyword
          &quot;HELP&quot;. Or, you can get help directly from us by emailing{" "}
          <a
            href="mailto:admin@autocarship.com"
            className="text-navy-800 underline underline-offset-2 hover:text-amber-700"
          >
            admin@autocarship.com
          </a>{" "}
          or calling (509) 253-9660.
        </p>
        <p>
          Additional Options: If you do not wish to receive SMS messages, you
          can choose not to check the SMS consent box on our forms.Messaging
          Disclosures: Message and data rates may apply. You can opt out at any
          time by texting &quot;STOP.&quot; For assistance, text &quot;HELP&quot;
          or visit our Privacy Policy and Terms and Conditions pages. Message
          frequency may vary. Carriers are not liable for delayed or undelivered
          messages.
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          4. Booking and Payment
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Accuracy: You must provide accurate information about the
            vehicle(s), including make, model, dimensions, weight, and any
            modifications.
          </li>
          <li>
            Quotes: Quotes provided are estimates based on market conditions;
            final pricing may vary due to fuel cost, route changes, or carrier
            availability.
          </li>
          <li>
            Reservation Fees: Can be paid via Zelle (No fees), Credit Card
            (3.5% fee via QuickBooks), or Venmo (2% fee).
          </li>
          <li>
            C.O.D. (Collect on Delivery): The remaining balance must be paid
            to the carrier at delivery via Cash, Certified funds, Cashier&apos;s
            check, or Money order.
          </li>
        </ul>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          5. Transport Process
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Delays may occur due to weather, road closures, or mechanical issues
            beyond our control.
          </li>
          <li>
            You or an authorized representative must be present at pickup and
            delivery for inspection and signing documentation.
          </li>
        </ul>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          6. Liability and Insurance
        </h2>
        <p>
          Auto Car Ship LLC acts solely as a property transportation broker and
          is not responsible for any cargo loss or damage claims under any
          circumstances.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Damage claims are covered by the carrier&apos;s cargo insurance
            ($100,000 to $250,000 per load).
          </li>
          <li>
            The Customer is responsible for filing claims directly with the
            Carrier who handled the shipment.
          </li>
          <li>
            Claims are subject to federal law, specifically the Carmack Amendment
            (49 U.S.C. §14706).
          </li>
        </ul>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          7. Cancellation and Refunds
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>You may cancel at any time before a driver is assigned.</li>
          <li>
            Cancellations after assigning a driver may be subject to cancellation
            fees.
          </li>
          <li>
            Refunds are processed upon approval and may take up to 3 business
            days to reflect in your account.
          </li>
        </ul>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          8. Customer Responsibilities
        </h2>
        <p>
          You are responsible for ensuring the vehicle is properly prepared,
          including removing personal belongings and ensuring it is in operable
          condition (unless booked as inoperable).
        </p>

        <h2 className="mt-10 font-heading text-xl font-bold text-navy-900">
          9. Contact Information
        </h2>
        <p>Auto Car Ship LLC (a registered trade name of Auto Haul Express LLC)</p>
        <p>
          6023 Ruby Way,
          <br />
          Nine Mile Falls, WA 99026
        </p>
      </div>
    </div>
  );
}
