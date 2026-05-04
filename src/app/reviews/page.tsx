import type { Metadata } from "next";
import { COMPANY } from "@/lib/constants";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { CUSTOMER_REVIEWS, REVIEWS_TOTAL_COUNT_LABEL } from "@/lib/reviews-data";
import { ReviewsShowcase } from "@/components/reviews/reviews-showcase";

export const metadata: Metadata = {
  title: pageTitle("Reviews"),
  description: clipMeta(
    `Customer reviews for car shipping booked through ${COMPANY.name}.`,
    160
  ),
  ...canonicalAndSocial(
    "/reviews",
    pageTitle("Reviews"),
    `Car shipping reviews for ${COMPANY.name}: pickup, pricing, delivery.`
  ),
};

export default function ReviewsPage() {
  return (
    <ReviewsShowcase
      reviews={CUSTOMER_REVIEWS}
      title="What our customers say"
      headingLevel="h1"
      description={`About ${REVIEWS_TOTAL_COUNT_LABEL} reviews on file. Below are 10 recent five-star reviews from shippers who used ${COMPANY.name}.`}
    />
  );
}
