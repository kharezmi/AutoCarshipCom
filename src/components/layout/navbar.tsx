"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import { SERVICES } from "@/lib/services-catalog";
import { VEHICLE_MAKES } from "@/lib/vehicle-makes";
import { cn } from "@/lib/utils";

const navLink =
  "text-sm font-medium text-slate-700 hover:text-navy-900 transition-colors";

function MegaPanel({
  open,
  children,
  className,
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute left-0 top-full z-50 mt-0 w-[min(100vw-2rem,42rem)] rounded-card border border-slate-100 bg-white p-6 shadow-quote",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [vehOpen, setVehOpen] = useState(false);

  const closeAll = () => {
    setSvcOpen(false);
    setVehOpen(false);
    setMobile(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <Link
          href="/"
          className="font-heading text-lg font-bold text-navy-900 sm:text-xl"
          onClick={closeAll}
        >
          {COMPANY.name}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className={navLink}>
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => {
              setSvcOpen(true);
              setVehOpen(false);
            }}
            onMouseLeave={() => setSvcOpen(false)}
          >
            <button
              type="button"
              className={cn(
                navLink,
                "inline-flex items-center gap-1",
                svcOpen && "text-navy-900"
              )}
              aria-expanded={svcOpen}
            >
              Services
              <ChevronDown className="h-4 w-4 text-amber-500" />
            </button>
            <MegaPanel open={svcOpen}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Transport options
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-surface hover:text-navy-900"
                    >
                      <span className="font-semibold text-navy-900">
                        {s.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {s.short}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/services"
                className="mt-4 inline-block text-sm font-semibold text-amber-600 hover:text-amber-500"
                onClick={() => setSvcOpen(false)}
              >
                View all services
              </Link>
            </MegaPanel>
          </div>

          <div
            className="relative"
            onMouseEnter={() => {
              setVehOpen(true);
              setSvcOpen(false);
            }}
            onMouseLeave={() => setVehOpen(false)}
          >
            <button
              type="button"
              className={cn(
                navLink,
                "inline-flex items-center gap-1",
                vehOpen && "text-navy-900"
              )}
              aria-expanded={vehOpen}
            >
              Ship by vehicle
              <ChevronDown className="h-4 w-4 text-amber-500" />
            </button>
            <MegaPanel open={vehOpen} className="w-[min(100vw-2rem,36rem)]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Popular makes
              </p>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {VEHICLE_MAKES.slice(0, 9).map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/shipping/${m.slug}`}
                      className="block rounded-lg px-2 py-1.5 text-sm text-navy-900 hover:bg-surface"
                      onClick={() => setVehOpen(false)}
                    >
                      {m.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/vehicles"
                  className="text-sm font-semibold text-amber-600 hover:text-amber-500"
                  onClick={() => setVehOpen(false)}
                >
                  All manufacturers A-Z
                </Link>
                <Link
                  href="/blogs"
                  className="text-sm font-semibold text-navy-800 hover:text-navy-900"
                  onClick={() => setVehOpen(false)}
                >
                  Shipping guides and blog
                </Link>
              </div>
            </MegaPanel>
          </div>

          <Link href="/blogs" className={navLink}>
            Blog
          </Link>
          <Link href="/reviews" className={navLink}>
            Reviews
          </Link>
          <Link href="/company/about" className={navLink}>
            Company
          </Link>
          <Link href="/contact" className={navLink}>
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${COMPANY.phoneTel}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900"
          >
            <Phone className="h-4 w-4 text-amber-500" />
            {COMPANY.phone}
          </a>
          <Button asChild size="sm">
            <a href="/#instant-quote">Get free quote</a>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-navy-900 lg:hidden"
          aria-label={mobile ? "Close menu" : "Open menu"}
          onClick={() => setMobile((v) => !v)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobile && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/" className={navLink} onClick={closeAll}>
              Home
            </Link>
            <p className="text-xs font-bold uppercase text-slate-400">
              Services
            </p>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="pl-2 text-sm text-slate-700"
                onClick={closeAll}
              >
                {s.title}
              </Link>
            ))}
            <p className="text-xs font-bold uppercase text-slate-400">
              Ship by vehicle
            </p>
            {VEHICLE_MAKES.slice(0, 6).map((m) => (
              <Link
                key={m.slug}
                href={`/shipping/${m.slug}`}
                className="pl-2 text-sm text-slate-700"
                onClick={closeAll}
              >
                {m.label}
              </Link>
            ))}
            <Link href="/vehicles" className="pl-2 text-sm text-amber-700" onClick={closeAll}>
              All makes A-Z
            </Link>
            <Link href="/blogs" className={navLink} onClick={closeAll}>
              Blog
            </Link>
            <Link href="/reviews" className={navLink} onClick={closeAll}>
              Reviews
            </Link>
            <Link href="/company/about" className={navLink} onClick={closeAll}>
              About
            </Link>
            <Link href="/contact" className={navLink} onClick={closeAll}>
              Contact
            </Link>
            <Button asChild className="mt-2 w-full">
              <a href="/#instant-quote" onClick={closeAll}>
                Get free quote
              </a>
            </Button>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="text-center text-sm font-semibold text-navy-900"
            >
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
