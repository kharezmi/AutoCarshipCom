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
  headline: `${brand} shipping (open or enclosed)`,
  body: `We broker ${brand} moves on insured motor carriers. Tell us year, model, running condition, and any lift or low clearance so the truck matches the car.`,
  bullets: [
    `Soft straps and liftgate when the carrier needs them for your ${brand}`,
    "Call dispatch if the pickup or drop is tight. We walk through it with you.",
    "Enclosed available when you want the car inside a trailer",
  ],
  heroImage: OPEN_CARRIER,
  sections: [
    {
      title: `Quoting your ${brand}`,
      body: `Ride height, wheels, and bumpers change how a truck loads. Put mods in the quote so the carrier brings the right ramp and deck space.`,
    },
    {
      title: `Loading`,
      body: `Soft ties and mirror blankets are standard on many fleets. Ask for pickup photos if you want them. Lowered ${brand}: say so when you book.`,
      image: unsplashImage(
        "photo-1492144534655-ae79c964c9d7",
        `Side profile of a ${brand} vehicle showing body lines`
      ),
    },
    {
      title: "Paperwork",
      body: "Declared value, lienholder, and running condition go on the BOL. We check those fields before the truck rolls.",
    },
  ],
});

export const VEHICLE_MAKES: VehicleMake[] = [
  {
    slug: "tesla",
    label: "Tesla",
    headline: "Tesla transport (EV loading requirements)",
    body: "Teslas need transport mode set per the screen menu, normal battery range for weight, and clearance for low air suspension. We book carriers used to EVs.",
    bullets: [
      "Open or enclosed options for Model 3, Y, S, X and Cybertruck",
      "Pickup windows discussed around charger cables and garage clearance",
      "Rush moves when equipment is open on your lane",
    ],
    heroImage: unsplashImage(
      "photo-1593941707882-a5bba14938c7",
      "Tesla vehicle at a charging station with cables connected"
    ),
    sections: [
      {
        title: "Transport mode and battery",
        body: "Follow the on-screen steps for transport mode before loading. Keep charge in a normal daily range unless we tell you otherwise for weight on the deck.",
      },
      {
        title: "Pickup locations",
        body: "Garages and chargers sometimes need a short move to a lot where a carrier can load. We note gate codes and cable clearance in the order.",
        image: unsplashImage(
          "photo-1469854523086-cc02fe5d8800",
          "Highway driving scene"
        ),
      },
      {
        title: "Cybertruck and wide trucks",
        body: "List wheel caps, covers, and any lift. We need width and height for deck placement.",
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
        title: "Older BMW coupes",
        body: "Older cars often need softer tie-downs and wheel bonnets. Tell us if the suspension is stock or lowered.",
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
      "Tight delivery windows noted on the order when you have them",
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
    headline: "Porsche shipping (low clearance)",
    body: "Low cars need the right ramp angle. Sports models usually ship enclosed; SUVs can go open if you prefer.",
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
        body: "Long tails and big wings need a shallow ramp. We book trailers with extended ramps or tilt decks when the job needs it.",
      },
      {
        title: "Track pads and splitters",
        body: "After track use, mention aggressive pads or sticky tires. Low splitters may need wood blocks on the ramp.",
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
    body: "Exotics usually move enclosed with soft ties and low-angle ramps. Insurance and declared value are checked before pickup.",
    bullets: [
      "Single-level enclosed trailers preferred",
      "Route planning for ground clearance",
      "Broker staff on the phone through delivery",
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
        body: "High-dollar cars need matching insurance paperwork. We check certificates, deductibles, and lienholder clauses before pickup.",
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
        body: "Lighter bikes often share a trailer with several chocks. Each bike gets its own tie-downs so fluids from one unit do not get on yours.",
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
    body: `AutoCarship LLC brokers ${label} shipments on open and enclosed motor carriers. Use the quote form for a ballpark, then we confirm dates and carrier with you by phone or email.`,
    bullets: [
      "Online quote intake with no obligation to book",
      "Licensed broker coordination with insured motor carriers",
      "Tracking portal updates when your order is active",
    ],
    heroImage: OPEN_CARRIER,
    sections: [
      {
        title: `Nationwide ${label} moves`,
        body: `Out-of-state purchase or relocation: we quote the lane the same way as any other make. List wheels, roof rack, lift kit, or tent so the truck fits.`,
      },
      {
        title: "Inspection photos",
        body: "Daylight photos at pickup and delivery help if there is a damage question later.",
        image: unsplashImage(
          "photo-1486262715619-67b85e0b08d3",
          "Open road stretching through the countryside at golden hour"
        ),
      },
      {
        title: "Switching open to enclosed",
        body: "If you change trailer type, we re-quote with the new mode so pricing stays clear.",
      },
    ],
  };
}
