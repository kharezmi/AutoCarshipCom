"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import {
  pickRandomReviewToast,
  type ReviewToastEntry,
} from "@/lib/review-toast-data";

/** How long the toast stays on screen (ms). */
const VISIBLE_MS = 6500;
/** Time hidden before the next toast (ms). */
const HIDDEN_MS = 16000;
/** First appearance after load so it doesn’t fight the promo modal. */
const INITIAL_DELAY_MS = 8000;

export function ReviewToast() {
  const pathname = usePathname() ?? "";
  const [visible, setVisible] = useState(false);
  const [entry, setEntry] = useState<ReviewToastEntry | null>(null);
  const lastIndex = useRef<number | undefined>(undefined);
  const timers = useRef<{ t1?: ReturnType<typeof setTimeout>; t2?: ReturnType<typeof setTimeout>; t0?: ReturnType<typeof setTimeout> }>({});

  const hideOnRoute =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_");

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (hideOnRoute) return;

    const clearAll = () => {
      if (timers.current.t0) clearTimeout(timers.current.t0);
      if (timers.current.t1) clearTimeout(timers.current.t1);
      if (timers.current.t2) clearTimeout(timers.current.t2);
      timers.current = {};
    };

    const showCycle = () => {
      const { entry: next, index } = pickRandomReviewToast(lastIndex.current);
      lastIndex.current = index;
      setEntry(next);
      setVisible(true);
      timers.current.t1 = setTimeout(() => {
        setVisible(false);
        timers.current.t2 = setTimeout(showCycle, HIDDEN_MS);
      }, VISIBLE_MS);
    };

    timers.current.t0 = setTimeout(showCycle, INITIAL_DELAY_MS);

    return () => {
      clearAll();
    };
  }, [hideOnRoute]);

  if (hideOnRoute) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[90] max-w-[min(calc(100vw-2rem),22rem)] sm:bottom-6 sm:left-6">
      <AnimatePresence mode="wait">
        {visible && entry ? (
          <motion.aside
            key={`${entry.name}-${entry.quote.slice(0, 24)}`}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto relative rounded-xl border border-slate-200/90 bg-white p-4 pr-10 shadow-[0_8px_30px_-6px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.03]"
          >
            <button
              type="button"
              onClick={dismiss}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Dismiss review"
            >
              <X className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <div className="flex gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-inner"
                aria-hidden
              >
                {entry.initial}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < entry.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-[13px] font-medium leading-snug text-slate-800">
                  &ldquo;{entry.quote}&rdquo;
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {entry.name}
                  <span className="text-slate-400">, </span>
                  {entry.cityState}
                </p>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
