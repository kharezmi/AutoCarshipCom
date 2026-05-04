import { Headphones, Shield, Wallet, MapPinned } from "lucide-react";

const cards = [
  {
    title: "Cargo coverage via the carrier",
    body: "Motor carriers carry insurance for your vehicle class. We spell out limits before pickup.",
    icon: Shield,
  },
  {
    title: "Billing spelled out early",
    body: "Deposits, COD balances, or pay on delivery: whatever the lane needs, you see it before you commit.",
    icon: Wallet,
  },
  {
    title: "Dispatch that answers",
    body: "Call or text when the HOA, weather, or truck height is an issue. We help sort it out.",
    icon: Headphones,
  },
  {
    title: "Route visibility",
    body: "Updates around pickup and delivery windows. Ask if your lane has tracking from the carrier.",
    icon: MapPinned,
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 text-white lg:py-24">
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/4 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          Why book with us
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-bold sm:text-4xl">
          Insurance, billing, and dispatch
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-300">
          We spell out carrier coverage, payment terms, and timing before you commit to a truck.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-lg backdrop-blur-sm transition hover:border-amber-400/30 hover:bg-white/[0.09]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                <c.icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 font-heading text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
