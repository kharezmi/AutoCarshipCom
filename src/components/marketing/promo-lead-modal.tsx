"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Mail, Tag, X } from "lucide-react";
import { COMPANY, PROMO_MODAL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/** Per browser tab: new tab means a fresh session so the popup can show again. */
const SESSION_SUBMITTED = "autocarship-promo-submitted";
const SESSION_DISMISSED = "autocarship-promo-dismissed";
const OPEN_DELAY_MS = 2500;

export function PromoLeadModal() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const hideOnRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_");

  useEffect(() => {
    if (hideOnRoute) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(SESSION_SUBMITTED)) return;
      if (sessionStorage.getItem(SESSION_DISMISSED)) return;
    } catch {
      /* private mode / blocked */
    }
    const id = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [hideOnRoute]);

  const dismiss = useCallback(() => {
    try {
      if (!sessionStorage.getItem(SESSION_SUBMITTED)) {
        sessionStorage.setItem(SESSION_DISMISSED, "1");
      }
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/promo-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || null,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setBusy(false);
        return;
      }
      try {
        sessionStorage.setItem(SESSION_SUBMITTED, "1");
      } catch {
        /* ignore */
      }
      setDone(true);
      window.setTimeout(() => setOpen(false), 2000);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  if (hideOnRoute) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && dismiss()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] w-[min(calc(100vw-1.25rem),21rem)] max-w-[calc(100vw-1.25rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_-12px_rgba(0,0,0,0.45)] outline-none ring-1 ring-black/5"
          )}
          onEscapeKeyDown={dismiss}
        >
          <Dialog.Title className="sr-only">{PROMO_MODAL.headline}</Dialog.Title>
          <Dialog.Description className="sr-only">{PROMO_MODAL.description}</Dialog.Description>

          {/* Modal header */}
          <div className="relative px-6 pb-10 pt-9 text-center">
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-800"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/20 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-8 -left-16 h-44 w-44 rounded-full bg-blue-950/25 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-1/2 top-6 h-24 w-24 -translate-x-1/2 rounded-full bg-white/10"
              aria-hidden
            />

            <div className="relative mx-auto flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-white/25 shadow-inner ring-1 ring-white/40 backdrop-blur-sm">
              <Tag className="h-7 w-7 text-white drop-shadow-sm" strokeWidth={2.25} aria-hidden />
            </div>
            <p className="relative mt-5 font-heading text-[1.65rem] font-extrabold leading-tight tracking-tight text-slate-900">
              {PROMO_MODAL.headline}
            </p>
            <p className="relative mt-2 text-sm font-semibold leading-snug text-slate-900/85">
              {PROMO_MODAL.sublinePrefix} {COMPANY.name}
            </p>

            <Dialog.Close
              type="button"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-800 shadow-md ring-1 ring-black/5 transition hover:bg-slate-50"
              aria-label="Close"
              onClick={dismiss}
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </Dialog.Close>
          </div>

          {/* Modal body */}
          <div className="bg-white px-6 pb-7 pt-1">
            {done ? (
              <p className="py-4 text-center text-sm font-semibold text-emerald-600">
                Thanks. We added you to the list.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <p className="text-center text-[13px] leading-relaxed text-slate-600">
                  {PROMO_MODAL.description}
                </p>
                <Input
                  name="name"
                  autoComplete="name"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-label="Your name (optional)"
                  className="h-11 rounded-xl border-slate-200 bg-white text-sm placeholder:text-slate-400"
                />
                <Input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email address *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Your email address (required)"
                  className="h-11 rounded-xl border-slate-200 bg-white text-sm placeholder:text-slate-400"
                />
                {error ? <p className="text-center text-xs text-red-600">{error}</p> : null}
                <Button
                  type="submit"
                  disabled={busy}
                  className="h-12 w-full rounded-xl border-0 bg-[#22c55e] text-[15px] font-bold text-white shadow-md transition hover:bg-[#16a34a] active:scale-[0.99]"
                >
                  <Mail className="mr-2 h-4 w-4" aria-hidden />
                  {busy ? "Sending…" : PROMO_MODAL.ctaLabel}
                </Button>
                <button
                  type="button"
                  onClick={dismiss}
                  className="w-full pb-1 pt-0.5 text-center text-[13px] text-slate-500 transition hover:text-slate-700"
                >
                  {PROMO_MODAL.dismissLabel}
                </button>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
