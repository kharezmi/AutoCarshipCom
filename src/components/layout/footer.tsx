import Link from "next/link";
import { COMPANY, PARTNERED_COMPANIES } from "@/lib/constants";
import { SERVICES } from "@/lib/services-catalog";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-6">
        <div>
          <p className="font-heading text-lg font-bold text-white">
            {COMPANY.name}
          </p>
          <p className="mt-2 text-sm text-slate-400">{COMPANY.tagline}</p>
          <p className="mt-4 text-sm">{COMPANY.addressLine}</p>
          <p className="text-sm">{COMPANY.cityStateZip}</p>
          <p className="mt-3 text-xs text-slate-500">{COMPANY.hours}</p>
          <div className="mt-4 space-y-1 text-sm">
            <p className="font-semibold text-white">Follow us</p>
            <a
              href={COMPANY.socialFacebook}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-300 hover:text-amber-400"
            >
              Facebook
            </a>
            <a
              href={COMPANY.socialInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-slate-300 hover:text-amber-400"
            >
              Instagram
            </a>
          </div>
        </div>
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Quick links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/blogs" className="hover:text-amber-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/vehicles" className="hover:text-amber-400">
                Shipping by make
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-amber-400">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/company/about" className="hover:text-amber-400">
                About us
              </Link>
            </li>
            <li>
              <Link href="/company/faq" className="hover:text-amber-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="hover:text-amber-400"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-white">
            Legals & trust
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="text-slate-300">{COMPANY.fmcsa}</li>
            <li className="text-slate-300">{COMPANY.dot}</li>
            <li className="text-slate-300">{COMPANY.mc}</li>
            <li>
              <Link href="/terms" className="hover:text-amber-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-amber-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs text-slate-500">
            We broker loads with motor carriers on lanes across the lower 48.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Partnered companies
          </p>
          <ul className="mt-2 space-y-1 text-xs text-slate-300">
            {PARTNERED_COMPANIES.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
        Rates shown online are estimates.
      </div>
    </footer>
  );
}
