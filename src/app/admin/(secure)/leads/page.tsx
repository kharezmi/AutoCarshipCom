import Link from "next/link";
import type { ContactLeadData, QuoteLeadData, StoredLead } from "@/lib/leads-types";
import { getLeads } from "@/lib/leads-store";

export const dynamic = "force-dynamic";

function isQuoteData(
  lead: StoredLead
): lead is StoredLead & { data: QuoteLeadData } {
  return lead.source === "quote";
}

function leadSummary(lead: StoredLead): string {
  if (isQuoteData(lead)) {
    const d = lead.data;
    return `${d.originZip} to ${d.destZip} · ${d.vehicleYear} ${d.vehicleMake} ${d.vehicleModel}`;
  }
  const d = lead.data as ContactLeadData;
  return `${d.origin} to ${d.destination}`;
}

function contactLine(lead: StoredLead): { name: string; email: string; phone: string } {
  if (isQuoteData(lead)) {
    return {
      name: lead.data.name,
      email: lead.data.email,
      phone: lead.data.phone,
    };
  }
  const d = lead.data as ContactLeadData;
  return { name: d.name, email: d.email, phone: d.phone };
}

export default function AdminLeadsPage() {
  const leads = getLeads();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-900">Leads</h1>
          <p className="mt-1 max-w-xl text-sm text-slate-600">
            Instant quotes and contact form submissions are saved to{" "}
            <code className="rounded bg-white px-1 text-xs">data/leads.json</code>{" "}
            on this server (not shown in git by default). Emails still send when
            Resend is configured.
          </p>
        </div>
        <Link
          href="/admin/posts"
          className="text-sm font-semibold text-amber-700 hover:text-amber-600"
        >
          ← Blog admin
        </Link>
      </div>

      {leads.length === 0 ? (
        <div className="mt-10 rounded-card border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
          <p className="font-medium text-navy-900">No leads yet</p>
          <p className="mt-2 text-sm">
            Submit a test quote from the homepage or the contact form. New rows land
            at the top instantly.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-card border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => {
                const c = contactLine(lead);
                return (
                  <tr key={lead.id} className="align-top hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                      {new Date(lead.createdAt).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          lead.source === "quote"
                            ? "rounded-full bg-navy-900 px-2 py-0.5 text-xs font-semibold text-white"
                            : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900"
                        }
                      >
                        {lead.source === "quote" ? "Quote" : "Contact"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-navy-900">{c.name}</p>
                      <a
                        href={`mailto:${c.email}`}
                        className="text-xs text-amber-700 hover:underline"
                      >
                        {c.email}
                      </a>
                      <p className="mt-0.5 text-xs text-slate-600">{c.phone}</p>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-700">
                      {leadSummary(lead)}
                    </td>
                    <td className="px-4 py-3">
                      <details className="cursor-pointer">
                        <summary className="text-xs font-semibold text-navy-800 hover:text-amber-700">
                          JSON
                        </summary>
                        <pre className="mt-2 max-h-48 max-w-md overflow-auto rounded-lg bg-slate-900 p-3 text-left text-xs text-slate-100">
                          {JSON.stringify(lead.data, null, 2)}
                        </pre>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
