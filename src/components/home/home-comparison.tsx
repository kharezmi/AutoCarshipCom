import { Check, X } from "lucide-react";

/** Each row: customer-friendly outcome. Green check = yes for that column. */
const rows: { label: string; autocarship: boolean; other: boolean }[] = [
  { label: "Ballpark price on the website first", autocarship: true, other: false },
  { label: "Fees and accessorials outlined before you sign", autocarship: true, other: false },
  { label: "Open and enclosed in the same quote flow", autocarship: true, other: false },
  { label: "U.S. broker dispatch line", autocarship: true, other: false },
  { label: "No last-minute add-ons at pickup without notice", autocarship: true, other: false },
];

function Cell({ ok }: { ok: boolean }) {
  return (
    <td className="px-4 py-3 text-center">
      {ok ? (
        <Check className="mx-auto h-5 w-5 text-emerald-400" aria-label="Yes" />
      ) : (
        <X className="mx-auto h-5 w-5 text-slate-500" aria-label="No" />
      )}
    </td>
  );
}

export function HomeComparison() {
  return (
    <section className="bg-navy-950 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
          Side by side
        </p>
        <h2 className="mt-3 text-center font-heading text-3xl font-bold sm:text-4xl">
          What shippers often compare
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-slate-300">
          The second column is a general comparison to common broker market behavior, not a single competitor. Get the
          final terms in writing on your order.
        </p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-sm">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-4 font-heading text-xs font-bold uppercase tracking-wide text-slate-400">
                  Experience
                </th>
                <th className="px-4 py-4 text-center font-heading text-xs font-bold uppercase tracking-wide text-amber-400">
                  AutoCarship
                </th>
                <th className="px-4 py-4 text-center font-heading text-xs font-bold uppercase tracking-wide text-slate-400">
                  Typical online broker
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                >
                  <th
                    scope="row"
                    className="px-4 py-3.5 pr-6 text-left font-medium text-slate-200"
                  >
                    {row.label}
                  </th>
                  <Cell ok={row.autocarship} />
                  <Cell ok={row.other} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
