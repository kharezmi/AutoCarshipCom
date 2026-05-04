/** Demo-style lines for the review toast (illustrative only, not verified testimonials). */
export type ReviewToastEntry = {
  initial: string;
  name: string;
  cityState: string;
  quote: string;
  rating: number;
};

export const REVIEW_TOAST_POOL: ReviewToastEntry[] = [
  {
    initial: "J",
    name: "John Carson",
    cityState: "Phoenix, AZ",
    quote: "Called with pickup questions. They picked up and the car arrived on the day promised.",
    rating: 5,
  },
  {
    initial: "S",
    name: "Sarah K.",
    cityState: "Chicago, IL",
    quote: "Open trailer cross-country. Car was dirty but no damage. Fine with me.",
    rating: 5,
  },
  {
    initial: "M",
    name: "Marcus Webb",
    cityState: "Denver, CO",
    quote: "Truck to Georgia. Driver texted ahead. BOL was quick.",
    rating: 5,
  },
  {
    initial: "E",
    name: "Elena Ruiz",
    cityState: "Miami, FL",
    quote: "Enclosed move for my coupe. Email updates were steady.",
    rating: 5,
  },
  {
    initial: "D",
    name: "David Chen",
    cityState: "Seattle, WA",
    quote: "EV shipped Seattle to Dallas. Window they quoted is what we got.",
    rating: 5,
  },
  {
    initial: "A",
    name: "Amanda Brooks",
    cityState: "Austin, TX",
    quote: "Classic car, tight street. They found a workable spot for loading.",
    rating: 5,
  },
  {
    initial: "R",
    name: "Robert Ingle",
    cityState: "Nashville, TN",
    quote: "Two loads same week. Same dispatcher, which made it easier.",
    rating: 5,
  },
  {
    initial: "K",
    name: "Kim Ortiz",
    cityState: "Portland, OR",
    quote: "Date change bumped the price a little. They said why in plain English.",
    rating: 5,
  },
  {
    initial: "T",
    name: "Tyler Nguyen",
    cityState: "San Diego, CA",
    quote: "Motorcycle crate to Chicago. Tie-downs looked correct at origin.",
    rating: 5,
  },
  {
    initial: "L",
    name: "Lisa Park",
    cityState: "Boston, MA",
    quote: "Weather moved pickup. They called before I had to chase them.",
    rating: 5,
  },
  {
    initial: "C",
    name: "Chris Dalton",
    cityState: "Atlanta, GA",
    quote: "Lifted truck. They checked height and sent equipment that fit.",
    rating: 5,
  },
  {
    initial: "N",
    name: "Nina Patel",
    cityState: "Dallas, TX",
    quote: "Shipped my son’s car to college. I asked for a lot of updates and they stayed polite.",
    rating: 5,
  },
  {
    initial: "G",
    name: "Greg Foster",
    cityState: "Minneapolis, MN",
    quote: "First time using a broker. Photo at pickup helped me relax a bit.",
    rating: 5,
  },
  {
    initial: "H",
    name: "Hannah Lee",
    cityState: "Charlotte, NC",
    quote: "Extra stop added cost. Annoying but they broke down the line items.",
    rating: 5,
  },
  {
    initial: "V",
    name: "Victor Morales",
    cityState: "Las Vegas, NV",
    quote: "Saturday gate code issue. A person answered the main line.",
    rating: 5,
  },
  {
    initial: "P",
    name: "Priya Shah",
    cityState: "Houston, TX",
    quote: "Out-of-state purchase. Car showed in the window they gave.",
    rating: 5,
  },
  {
    initial: "B",
    name: "Brian O'Neill",
    cityState: "Columbus, OH",
    quote: "Minivan to Florida. Driver reminded us about the toll tag. Small thing but useful.",
    rating: 5,
  },
  {
    initial: "W",
    name: "Whitney James",
    cityState: "Salt Lake City, UT",
    quote: "They did not push enclosed. Open was enough for my truck.",
    rating: 5,
  },
];

export function pickRandomReviewToast(excludeIndex?: number): {
  entry: ReviewToastEntry;
  index: number;
} {
  if (REVIEW_TOAST_POOL.length === 0) {
    throw new Error("Review toast pool empty");
  }
  let index = Math.floor(Math.random() * REVIEW_TOAST_POOL.length);
  if (
    excludeIndex != null &&
    REVIEW_TOAST_POOL.length > 1 &&
    index === excludeIndex
  ) {
    index = (index + 1) % REVIEW_TOAST_POOL.length;
  }
  return { entry: REVIEW_TOAST_POOL[index], index };
}
