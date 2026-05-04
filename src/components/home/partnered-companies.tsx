import { PARTNERED_COMPANIES } from "@/lib/constants";

export function PartneredCompanies() {
  return (
    <section className="border-t border-slate-200 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Partner carriers we work with
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
          Fleets and owner-operators we have used on various lanes (names for reference only).
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {PARTNERED_COMPANIES.map((partner) => (
            <div
              key={partner}
              className="rounded-full border border-slate-200 bg-gradient-to-b from-slate-50 to-white px-5 py-2.5 text-sm font-semibold text-navy-900 shadow-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
