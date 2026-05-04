import { MapPin, Milestone, Compass } from "lucide-react";

const bands = [
  {
    title: "Shorter hauls",
    range: "Under ~500 mi",
    body: "Often the most budget-friendly moves when timing is flexible and the vehicle is running.",
    icon: MapPin,
  },
  {
    title: "Mid-distance",
    range: "Roughly 500 to 1,500 mi",
    body: "Rates follow seasonal demand, fuel, and how tight carrier capacity is on that lane.",
    icon: Milestone,
  },
  {
    title: "Coast-to-coast & long haul",
    range: "About 1,500+ mi",
    body: "Pickup windows and equipment type (open vs enclosed) move the needle more than a generic online guess.",
    icon: Compass,
  },
];

export function HomePricingBands() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          Rough guide
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
          What moves the price
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Miles, season, and equipment type all matter. Use the quote form for your route. The bands below are not a
          guarantee.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bands.map((b) => (
            <div
              key={b.title}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm"
            >
              <b.icon className="h-8 w-8 text-navy-900 opacity-80" aria-hidden />
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-amber-600">
                {b.range}
              </p>
              <h3 className="mt-1 font-heading text-xl font-bold text-navy-900">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">
          Final pricing is confirmed in writing with your order details, carrier assignment, and payment terms.
        </p>
      </div>
    </section>
  );
}
