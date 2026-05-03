import { ClipboardList, Truck, MapPin, BadgeCheck } from "lucide-react";

const items = [
  {
    title: "Quote in minutes",
    body: "Enter your route and vehicle details for an instant ballpark estimate.",
    icon: ClipboardList,
  },
  {
    title: "Carrier match",
    body: "We assign a vetted driver and confirm pickup windows that fit your schedule.",
    icon: Truck,
  },
  {
    title: "Pickup & transit",
    body: "Condition photos available on request; GPS updates on many routes.",
    icon: MapPin,
  },
  {
    title: "Delivery",
    body: "Inspect at delivery, sign the bill of lading, grab your keys. Dispatch keeps a line open if something looks off.",
    icon: BadgeCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <h2 className="font-heading text-center text-3xl font-bold text-navy-900 sm:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Four clear steps from quote request to keys in your hand.
        </p>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="relative rounded-card border border-slate-100 bg-surface p-6 shadow-sm"
            >
              <span className="absolute right-4 top-4 font-heading text-4xl font-black text-slate-200">
                {i + 1}
              </span>
              <item.icon className="h-10 w-10 text-amber-500" aria-hidden />
              <h3 className="mt-4 font-heading text-lg font-bold text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
