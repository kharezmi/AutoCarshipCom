import { PARTNERED_COMPANIES } from "@/lib/constants";

export function PartneredCompanies() {
  return (
    <section className="bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Partnered companies
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERED_COMPANIES.map((partner) => (
            <div
              key={partner}
              className="rounded-card border border-slate-200 bg-surface px-4 py-3 text-center text-sm font-semibold text-navy-900"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
