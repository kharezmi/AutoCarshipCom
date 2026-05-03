import { Shield, Wallet, MapPinned } from "lucide-react";

const cards = [
  {
    title: "Fully insured",
    body: "Carriers in our network carry cargo coverage appropriate to your vehicle class.",
    icon: Shield,
  },
  {
    title: "No upfront deposit",
    body: "Carrier-friendly billing gets spelled out during booking so you know deposits, balances, or pay-on-delivery rules up front.",
    icon: Wallet,
  },
  {
    title: "GPS tracking",
    body: "Many routes include live location pings; tracking portal summarizes status between updates.",
    icon: MapPinned,
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="font-heading text-center text-3xl font-bold text-navy-900 sm:text-4xl">
          Why shippers choose us
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-card border border-slate-100 bg-white p-8 shadow-card"
            >
              <c.icon className="h-10 w-10 text-navy-900" />
              <h3 className="mt-4 font-heading text-xl font-bold text-navy-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
