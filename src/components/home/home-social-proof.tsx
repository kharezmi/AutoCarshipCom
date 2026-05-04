import { CUSTOMER_REVIEWS, REVIEWS_TOTAL_COUNT_LABEL } from "@/lib/reviews-data";
import { COMPANY } from "@/lib/constants";
import { ReviewsShowcase } from "@/components/reviews/reviews-showcase";

export function HomeSocialProof() {
  return (
    <ReviewsShowcase
      reviews={CUSTOMER_REVIEWS.slice(0, 3)}
      title="What our customers say"
      headingLevel="h2"
      description={`About ${REVIEWS_TOTAL_COUNT_LABEL} reviews on file from shippers who used ${COMPANY.name}. Three recent ones:`}
      cta={{ href: "/reviews", label: "Read all reviews" }}
    />
  );
}
