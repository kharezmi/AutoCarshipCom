import { Clock, Route, ShieldCheck } from "lucide-react";

const steps = [
  {
    title: "Ballpark on the site",
    body: "Route and vehicle fields feed the calculator. You see a number right away; a rep follows up if you want to book.",
    icon: Clock,
  },
  {
    title: "Licensed motor carrier",
    body: "We work with FMCSA-registered trucking companies. You approve timing and carrier info before the order is set.",
    icon: Route,
  },
  {
    title: "Pickup through delivery",
    body: "BOL at pickup and delivery, cargo insurance through the carrier, phone number on your paperwork if plans change.",
    icon: ShieldCheck,
  },
];

export function HomeNextSteps() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
          After you submit
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold text-navy-900 sm:text-4xl">
          What happens next
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-slate-600">
          Quote first, then carrier assignment, then pickup and drop.
        </p>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.title}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-quote"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-950 text-amber-400 shadow-inner">
                <s.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 font-heading text-lg font-bold text-navy-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
