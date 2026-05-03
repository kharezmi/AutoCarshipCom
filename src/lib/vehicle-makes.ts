import type { RichImage, RichSection } from "@/lib/content-types";
import { unsplashImage } from "@/lib/unsplash-image";

const OPEN_CARRIER = unsplashImage(
  "photo-1601584115197-04ecc0da31d7",
  "Open auto transport trailer loaded with customer vehicles"
);

export type VehicleMake = {
  slug: string;
  label: string;
  headline: string;
  body: string;
  bullets: string[];
  heroImage: RichImage;
  sections: RichSection[];
};

const template = (brand: string, slug: string): VehicleMake => ({
  slug,
  label: brand,
  headline: `${brand} transport from driveway to driveway`,
  body: `Shipping a ${brand} requires careful loading, secure tie-downs, and experienced drivers. AutoCarship LLC coordinates enclosed and open carriers nationwide, with transparent pricing and proactive updates from pickup through delivery.`,
  bullets: [
    `Low-clearance and performance ${brand} models handled with soft straps and liftgate when needed`,
    "Dispatch picks up the phone and talks through the lane, no scripted kiosk",
    "Optional enclosed transport for maximum protection",
  ],
  heroImage: OPEN_CARRIER,
  sections: [
    {
      title: `Why ${brand} owners book dedicated transport`,
      body: `${brand} builds vary widely in ride height, wheel offset, and bumper design. We capture those details in the quote so the carrier arrives with the right ramps, deck spacing, and strap plan instead of improvising on your curb.`,
    },
    {
      title: `Loading discipline for ${brand} sheet metal`,
      body: `Door dings and rocker scrapes usually trace back to rushed staging. Our network favors soft ties, mirror blankets, and staged photos at pickup when you request them. If your ${brand} is lowered, say so up front so we block a lift-friendly window.`,
      image: unsplashImage(
        "photo-1492144534655-ae79c964c9d7",
        `Side profile of a ${brand} vehicle showing body lines`
      ),
    },
    {
      title: "Paperwork that keeps insurance aligned",
      body: "Declared value, lienholder contacts, and running condition notes all ride on the bill of lading. We audit those fields before dispatch so a carrier cannot claim ignorance if something is off-spec at delivery.",
    },
  ],
});

export const VEHICLE_MAKES: VehicleMake[] = [
  {
    slug: "tesla",
    label: "Tesla",
    headline: "Tesla shipping with EV-ready carriers nationwide",
    body: "Electric vehicles need carriers who understand battery safety, low ground clearance, and manufacturer transport mode steps. We route Teslas on vetted fleets with the right equipment and insurance limits for high-value EVs.",
    bullets: [
      "Open or enclosed options for Model 3, Y, S, X and Cybertruck",
      "Clear communication on pickup windows at charging-friendly locations",
      "Expedited options when you need the vehicle moved fast",
    ],
    heroImage: unsplashImage(
      "photo-1593941707882-a5bba14938c7",
      "Tesla vehicle at a charging station with cables connected"
    ),
    sections: [
      {
        title: "Transport mode and battery prep",
        body: "Tesla’s transport mode limits motor torque and keeps the suspension from cycling unpredictably. Share the latest steps from your touchscreen menu so the driver can enable them before rolling onto the deck. Keep charge between roughly twenty and eighty percent unless we specify otherwise for weight.",
      },
      {
        title: "Pickup at apartments, offices, or chargers",
        body: "Urban towers and tight garages often need a short roll to a staging lot. We coordinate with building security, map charger cables out of the way, and photograph the walk-around while the car is still on level pavement.",
        image: unsplashImage(
          "photo-1469854523086-cc02fe5d8800",
          "Open highway through wide-open landscape at golden hour"
        ),
      },
      {
        title: "Cybertruck and large footprint loads",
        body: "Wide stainless bodies need extra mirror clearance on narrow ramps. Tell us about wheel caps, aero covers, and aftermarket lifts so we reserve deck space that clears the fenders without rubbing neighboring units.",
      },
    ],
  },
  {
    slug: "bmw",
    label: "BMW",
    headline: "BMW transport for M cars, SUVs, and daily drivers",
    body: "From M3 to X7, we pair your BMW with carriers experienced with lowered cars and sporty suspensions. Enclosed rigs stay on standby for Classics and newer M trims.",
    bullets: [
      "Door-to-door service available in most metro areas",
      "Condition-based pricing for inoperable vehicles",
      "GPS-tracked updates on many routes",
    ],
    heroImage: unsplashImage(
      "photo-1492144534655-ae79c964c9d7",
      "Sleek BMW-style sedan profile on the road"
    ),
    sections: [
      {
        title: "M Performance and low splitter clearance",
        body: "Front lips and carbon splitters hate steep ramps. We flag those trims for enclosed or liftgate-equipped trucks and sometimes schedule morning pickups when traffic is light enough to use the full road width for alignment.",
      },
      {
        title: "xDrive SUVs and trailer balance",
        body: "X5, X7, and XM builds add height and weight that change tie-down angles. Drivers shift deck placement so the center of gravity stays within spec. Tell us about running boards or roof boxes so height clearance is confirmed before dispatch.",
        image: unsplashImage(
          "photo-1486262715619-67b85e0b08d3",
          "Wide highway vista suited to truck and SUV transport lanes"
        ),
      },
      {
        title: "Classic BMW coupes",
        body: "Older chassis often need softer suspension travel. We match those cars with drivers who still carry wheel bonnets and who know how to baby unibody cars without grabbing control arms.",
      },
    ],
  },
  {
    slug: "ford",
    label: "Ford",
    headline: "Ford truck and SUV shipping from F-150 through Bronco",
    body: "Full-size trucks need the right trailer configuration. We quote based on dimensions and weight class so your F-150, Super Duty, or Bronco ships without surprises.",
    bullets: [
      "Accurate quotes for oversized and lifted trucks when details are provided",
      "Open transport is the most common and cost-effective option",
      "Cross-country and regional lanes booked daily",
    ],
    heroImage: unsplashImage(
      "photo-1601584115197-04ecc0da31d7",
      "Open auto transport trailer loaded with customer vehicles"
    ),
    sections: [
      {
        title: "Lifted F-Series and deck height math",
        body: "Lift kits, oversized tires, and roof racks change which racks can legally carry the truck. Send current ride height and tire width so we book a lowboy or step-deck when a standard carrier cannot clear overhead bridges along the lane.",
      },
      {
        title: "Bronco and Raptor aero parts",
        body: "Removable doors and roof panels need to be secured or removed before transport. Flag modular tops and bed racks so straps never crush a freedom panel seal.",
        image: unsplashImage(
          "photo-1568605117036-5fe5e7bab0b7",
          "Residential neighborhood street suited for truck staging"
        ),
      },
      {
        title: "Fleet and dealer programs",
        body: "Dealer trades and rental fleet rotations often move in multiples. Dispatch batches compatible units on the same truck when calendars line up, which keeps per-unit pricing predictable.",
      },
    ],
  },
  template("Chevrolet", "chevrolet"),
  template("Toyota", "toyota"),
  template("Honda", "honda"),
  {
    slug: "mercedes-benz",
    label: "Mercedes-Benz",
    headline: "Mercedes-Benz shipping for luxury sedans and AMG builds",
    body: "Mercedes vehicles often benefit from enclosed transport for paint and trim protection. We also move daily drivers on open carriers at competitive rates.",
    bullets: [
      "Enclosed recommended for S-Class, AMG GT, and G-Wagen builds",
      "White-glove scheduling for narrow delivery windows",
      "Nationwide dealer and relocation coordination",
    ],
    heroImage: unsplashImage(
      "photo-1549317661-bd32c8ce0db2",
      "Classic luxury automobile in a studio setting"
    ),
    sections: [
      {
        title: "AIRMATIC and ride height locks",
        body: "Tell us if the vehicle must stay in lift mode for loading. Some AMG models need specific key cycles before transport. We document those steps on the BOL so the next driver in the chain does not reset suspension mid-haul.",
      },
      {
        title: "Maybach and long-wheelbase sedans",
        body: "Extra length means measuring diagonal clearance on enclosed trailers. We reserve single-level slots when needed and avoid stacking anything above a flagship sedan.",
        image: unsplashImage(
          "photo-1503376780353-7e6692767b70",
          "Performance vehicle on the road with clean lines and motion"
        ),
      },
      {
        title: "G-Wagen roof racks and ladders",
        body: "Accessory height is easy to forget. Provide total height including antennas and spare tire covers so we do not scrape a parking garage ceiling during pickup.",
      },
    ],
  },
  template("Audi", "audi"),
  {
    slug: "porsche",
    label: "Porsche",
    headline: "Porsche transport with performance-first handling",
    body: "Low ride heights and wide bodies demand the right ramps and clearance. We prioritize enclosed carriers for Porsche sports cars and track builds.",
    bullets: [
      "Enclosed-first routing for 911, Cayman, and Boxster",
      "Liftgate and winch support for inoperable project cars when arranged in advance",
      "Photo documentation available on request",
    ],
    heroImage: unsplashImage(
      "photo-1503376780353-7e6692767b70",
      "Sports car in motion on a winding road"
    ),
    sections: [
      {
        title: "911 and mid-engine clearance",
        body: "Long tails and winged GT cars need measured approach angles. We pair those builds with trailers that offer extended ramps or hydraulic tilts so the nose never kisses the deck.",
      },
      {
        title: "Track pads and splitter care",
        body: "If you are shipping straight from a track day, mention aggressive brake pads or sticky tires so the driver avoids smoking the trailer winch. We also cover splitter wood blocks when low approaches are unavoidable.",
        image: unsplashImage(
          "photo-1492144534655-ae79c964c9d7",
          "Vehicle profile highlighting aerodynamic body lines"
        ),
      },
      {
        title: "Cayenne and Macan SUV moves",
        body: "SUVs still need height checks when roof boxes or off-road tires are installed. Open carriers work well for daily-driver Cayennes, while air-suspension trims get noted for gentle deck transitions.",
      },
    ],
  },
  {
    slug: "lamborghini",
    label: "Lamborghini",
    headline: "Exotic & Lamborghini enclosed transport",
    body: "Exotics ship enclosed with soft ties, minimal angle ramps, and drivers who specialize in supercars. Expect white-glove timing and premium insurance verification.",
    bullets: [
      "Single-level enclosed trailers preferred",
      "Route planning for ground clearance",
      "Dedicated support from quote to delivery",
    ],
    heroImage: unsplashImage(
      "photo-1503376780353-7e6692767b70",
      "Performance sports car on an open road with motion blur"
    ),
    sections: [
      {
        title: "Lift systems and nose lift buttons",
        body: "Huracán and Aventador nose lifts only buy a few inches. We still map ferry ramps, hotel speed bumps, and fuel stops before the route is approved. Drivers carry low-profile skates when needed.",
      },
      {
        title: "SVJ, STO, and aero load planning",
        body: "Big wings change airflow on the trailer. We position those cars forward or backward depending on vortex risk to other units, and we strap through engineered points only.",
        image: unsplashImage(
          "photo-1549317661-bd32c8ce0db2",
          "Classic luxury automobile in a controlled indoor setting"
        ),
      },
      {
        title: "Insurance stacks and declared value",
        body: "Seven-figure cars need seven-figure paperwork. We triple-check certificates, deductibles, and lienholder clauses before the rig leaves. No surprises at delivery.",
      },
    ],
  },
  {
    slug: "harley-davidson",
    label: "Harley-Davidson",
    headline: "Motorcycle shipping with crated and pallet builds",
    body: "Motorcycles require wheel chocks, soft ties, and often crate or pallet service. Tell us your bike type and we'll quote the safest method for your timeline.",
    bullets: [
      "Open motorcycle transport for many domestic moves",
      "Enclosed or crated for high-value or long-distance peace of mind",
      "Residential pickup where carrier access allows",
    ],
    heroImage: unsplashImage(
      "photo-1471478331149-c72f17e33c73",
      "Motorcycle rider on a paved road with clear sky"
    ),
    sections: [
      {
        title: "Touring bikes and fairing clearance",
        body: "Road Glide and Ultra Limited fairings are wide. We measure handlebar width and saddlebag spread so the pallet or chock setup never forces a lean that stresses fork seals.",
      },
      {
        title: "Softail and Sportster loads",
        body: "Lighter bikes often move on shared motorcycle trailers with multiple chocks. We still isolate each unit with bar harnesses so a neighbor’s leak never drips on your tank.",
        image: unsplashImage(
          "photo-1558618666-fcd25c85cd64",
          "Motorcycle touring on a scenic highway"
        ),
      },
      {
        title: "CVO and paint-heavy builds",
        body: "Custom paint and metal flake need padded bars and blanket wraps. Mention aftermarket audio fairings so we avoid pressure points on new fiberglass.",
      },
    ],
  },
];

export const MAKE_BY_SLUG = Object.fromEntries(
  VEHICLE_MAKES.map((m) => [m.slug, m])
);

export function getMake(slug: string): VehicleMake | null {
  return MAKE_BY_SLUG[slug] ?? null;
}

export function genericMake(slug: string): VehicleMake {
  const label = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    slug,
    label,
    headline: `${label} auto transport nationwide`,
    body: `AutoCarship LLC moves ${label} vehicles across the United States on vetted open and enclosed carriers. Share your pickup and delivery locations for an instant estimate, then lock in dates with our dispatch team.`,
    bullets: [
      "Online quote intake with no obligation to book",
      "Licensed logistics coordination with insured carriers",
      "Tracking portal updates when your order is active",
    ],
    heroImage: OPEN_CARRIER,
    sections: [
      {
        title: `Nationwide ${label} coverage`,
        body: `Whether you bought a ${label} out of state or you are moving for work, we quote the lane with the same detail we use for flagship brands. Tell us about aftermarket wheels, roof tents, or suspension lifts so equipment matches reality.`,
      },
      {
        title: "Photo-ready inspections",
        body: "We recommend daylight photos at pickup and delivery. Those shots protect both sides if weather or road debris becomes a question later.",
        image: unsplashImage(
          "photo-1486262715619-67b85e0b08d3",
          "Open road stretching through the countryside at golden hour"
        ),
      },
      {
        title: "Switching to enclosed mid-quote",
        body: "If you start on open pricing and later decide you want enclosed, we rebuild the quote instead of tacking on mystery fees. The goal is an apples-to-apples comparison.",
      },
    ],
  };
}
