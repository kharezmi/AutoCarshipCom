import { ClipboardList, Truck, MapPin, BadgeCheck } from "lucide-react";

const items = [
  {
    title: "Quote",
    body: "Enter ZIPs or cities. You get a ballpark on screen, then we firm it up if you want to book.",
    icon: ClipboardList,
  },
  {
    title: "Carrier",
    body: "We assign an FMCSA-listed motor carrier. You get pickup window info before it is final.",
    icon: Truck,
  },
  {
    title: "Pickup & transit",
    body: "Bill of lading at pickup, straps per carrier standard, updates when the truck is rolling.",
    icon: MapPin,
  },
  {
    title: "Delivery",
    body: "Inspect with the driver, sign off, keys back. Call us if something does not match the BOL.",
    icon: BadgeCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          How it works
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
          Four steps
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Same flow for one car or a few units. We adjust the paperwork to the load.
        </p>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/80 p-6 shadow-sm ring-1 ring-slate-100/80 transition hover:shadow-card"
            >
              <span
                className="font-heading text-5xl font-black leading-none text-amber-500/25"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <item.icon className="relative -mt-6 h-10 w-10 text-navy-900" aria-hidden />
              <h3 className="relative mt-4 font-heading text-lg font-bold text-navy-900">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
