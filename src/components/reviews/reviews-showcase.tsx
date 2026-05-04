import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import type { CustomerReview } from "@/lib/reviews-data";
import { REVIEWS_TOTAL_COUNT_LABEL } from "@/lib/reviews-data";
import { COMPANY } from "@/lib/constants";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ r }: { r: CustomerReview }) {
  return (
    <li className="group flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_24px_-8px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200/80 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <StarRow rating={r.rating} />
        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          Site review
        </span>
      </div>
      <p className="mt-4 flex-1 text-[15px] font-semibold leading-snug tracking-tight text-navy-900">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">{r.name}</p>
          <p className="mt-0.5 text-xs text-slate-500">{r.location}</p>
        </div>
        <p className="flex shrink-0 items-center gap-1 text-sm font-bold text-emerald-600">
          <MapPin className="h-4 w-4" aria-hidden />
          <span>{r.routeLabel ?? r.location}</span>
        </p>
      </div>
    </li>
  );
}

type ReviewsShowcaseProps = {
  reviews: CustomerReview[];
  title: string;
  /** Use h1 on standalone page for SEO; h2 on homepage. */
  headingLevel?: "h1" | "h2";
  description: string;
  cta?: { href: string; label: string };
};

export function ReviewsShowcase({
  reviews,
  title,
  headingLevel = "h2",
  description,
  cta,
}: ReviewsShowcaseProps) {
  const n = reviews.length;
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / n;
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPct = Math.round((fiveStarCount / n) * 100);

  const HeadingTag = headingLevel;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-slate-50 to-white py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/35 to-transparent"
        aria-hidden
      />
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
            Reviews
          </p>
          <HeadingTag
            className={`mt-3 font-heading font-extrabold tracking-tight text-navy-900 ${
              headingLevel === "h1"
                ? "text-4xl sm:text-[2.35rem]"
                : "text-3xl sm:text-4xl lg:text-[2.35rem]"
            }`}
          >
            {title}
          </HeadingTag>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 sm:text-base">{description}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200/90 bg-white px-2 py-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.18)] sm:px-6 sm:py-8">
          <div className="grid grid-cols-3 divide-x divide-slate-200">
            <div className="px-2 text-center sm:px-4">
              <p className="font-heading text-3xl font-extrabold tracking-tight text-emerald-600 sm:text-4xl">
                {avg.toFixed(1)}
              </p>
              <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                Avg. rating ({REVIEWS_TOTAL_COUNT_LABEL} total reviews)
              </p>
            </div>
            <div className="px-2 text-center sm:px-4">
              <p className="font-heading text-3xl font-extrabold tracking-tight text-emerald-600 sm:text-4xl">
                {fiveStarPct}%
              </p>
              <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                Five-star rated ({REVIEWS_TOTAL_COUNT_LABEL} moves)
              </p>
            </div>
            <div className="px-2 text-center sm:px-4">
              <p className="font-heading text-2xl font-extrabold tracking-tight text-blue-800 sm:text-3xl">
                Broker
              </p>
              <p className="mt-1 text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
                FMCSA licensed (DOT {COMPANY.dot.replace("US DOT: ", "")})
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-slate-600 sm:text-sm">
          {n} recent {n === 1 ? "review" : "reviews"} below; we keep {REVIEWS_TOTAL_COUNT_LABEL} on file overall.
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {reviews.map((r, i) => (
            <ReviewCard key={`${r.name}-${r.location}-${i}`} r={r} />
          ))}
        </ul>

        {cta ? (
          <div className="mt-12 flex justify-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-emerald-500 active:scale-[0.99]"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
