/** Shown next to stats (total volume across all submissions). */
export const REVIEWS_TOTAL_COUNT_LABEL = "500+" as const;

export type CustomerReview = {
  name: string;
  location: string;
  routeLabel?: string;
  text: string;
  rating: number;
};

/** Ten recent five-star samples; totals in UI use REVIEWS_TOTAL_COUNT_LABEL. */
export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Jordan M.",
    location: "Austin, TX",
    routeLabel: "CA to TX",
    text: "Called with questions about pickup. They answered and the Civic showed up on the day we agreed.",
    rating: 5,
  },
  {
    name: "Sarah K.",
    location: "Chicago, IL",
    routeLabel: "Coast",
    text: "Audi shipped open cross-country. Dirty from the road but no new damage. Would use again.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    location: "Denver, CO",
    routeLabel: "CO to GA",
    text: "F-150 to Georgia. Driver texted before arrival. Paperwork was simple.",
    rating: 5,
  },
  {
    name: "Elena Ruiz",
    location: "Miami, FL",
    routeLabel: "Enclosed",
    text: "Porsche in an enclosed trailer. Office stayed in touch the whole way.",
    rating: 5,
  },
  {
    name: "David Chen",
    location: "Seattle, WA",
    routeLabel: "WA to TX",
    text: "Model Y Seattle to Dallas. Pickup window they gave was what happened.",
    rating: 5,
  },
  {
    name: "Amanda Brooks",
    location: "Austin, TX",
    routeLabel: "TX to VA",
    text: "1966 Mustang. Narrow street. They worked with me on where the truck could sit.",
    rating: 5,
  },
  {
    name: "Robert Ingle",
    location: "Nashville, TN",
    routeLabel: "Dealer lane",
    text: "Two dealer trades in one week. Same contact both times, which helped.",
    rating: 5,
  },
  {
    name: "Kim Ortiz",
    location: "Portland, OR",
    routeLabel: "FL to OR",
    text: "Florida to Oregon snowbird run. Price changed when I moved the date; they explained the reason.",
    rating: 5,
  },
  {
    name: "Tyler Nguyen",
    location: "San Diego, CA",
    routeLabel: "CA to IL",
    text: "Bike crated to Chicago. Strapping looked solid at pickup.",
    rating: 5,
  },
  {
    name: "Lisa Park",
    location: "Boston, MA",
    routeLabel: "MA to CA",
    text: "BMW X5 to California. Rain delayed pickup one day; they called me first.",
    rating: 5,
  },
];
