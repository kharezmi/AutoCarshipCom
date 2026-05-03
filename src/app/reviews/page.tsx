import type { Metadata } from "next";
import { Star } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: pageTitle("Reviews"),
  description: clipMeta(
    `Recent customer testimonials for nationwide auto transports booked through ${COMPANY.name}.`,
    160
  ),
  ...canonicalAndSocial(
    "/reviews",
    pageTitle("Reviews"),
    `Car shipping reviews for ${COMPANY.name}. Real feedback on pickup updates, pricing, and delivery handling.`
  ),
};

const reviews = [
  {
    name: "Jordan M.",
    location: "Austin, TX",
    text: "Clear updates from pickup in California through delivery in Texas. The hauler sent pickup photos without us asking.",
    rating: 5,
  },
  {
    name: "Priya S.",
    location: "Chicago, IL",
    text: "Enclosed move for my 911 went smoothly. Pricing matched the ballpark quote once dimensions were confirmed.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    location: "Miami, FL",
    text: "Booked open transport for two dealer trades. Dispatch stayed on top of narrow delivery windows.",
    rating: 5,
  },
  {
    name: "Elena R.",
    location: "Seattle, WA",
    text: "Cross-country relocation with a lifted truck handled the trailer match well and billed exactly what we expected.",
    rating: 4,
  },
  {
    name: "Chris P.",
    location: "Denver, CO",
    text: "Fast response times and honest guidance when weather delayed the lane by a day.",
    rating: 5,
  },
  {
    name: "Sam K.",
    location: "Atlanta, GA",
    text: "Motorcycle crate service was worth it for the long haul. Team explained every charge upfront.",
    rating: 5,
  },
];

export default function ReviewsPage() {
  const avg =
    reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-navy-900">
              Reviews
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Customer testimonials from shippers who moved with AutoCarship
              LLC.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-card border border-amber-200 bg-amber-50 px-5 py-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.round(avg)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <div>
              <p className="font-heading text-xl font-bold text-navy-900">
                {avg.toFixed(1)} / 5
              </p>
              <p className="text-xs text-slate-600">Average customer rating</p>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} className="h-full">
              <CardContent className="p-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  &ldquo;{r.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-navy-900">
                  {r.name}
                </p>
                <p className="text-xs text-slate-500">{r.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
