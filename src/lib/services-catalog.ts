import type { RichImage, RichSection } from "@/lib/content-types";
import { unsplashImage } from "@/lib/unsplash-image";

export type ServiceItem = {
  slug: string;
  title: string;
  short: string;
  description: string;
  highlights: string[];
  heroImage: RichImage;
  sections: RichSection[];
  prepChecklist: { title: string; items: string[] };
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "open-auto-transport",
    title: "Open Auto Transport",
    short: "Open trailer. The usual choice for most cars and trucks.",
    description:
      "Cars ride on a two-level open carrier with wheel straps. We book FMCSA-registered carriers and confirm your vehicle type and condition before assigning a truck.",
    highlights: [
      "Usually the lowest cost option",
      "Easier to find trucks on busy lanes",
      "Cargo insurance through the assigned carrier",
    ],
    heroImage: unsplashImage(
      "photo-1761917904658-2a9ecb84a169",
      "Car carrier semi truck hauling multiple vehicles on a highway"
    ),
    sections: [
      {
        title: "How open transport works",
        body: "Drivers strap over the tires (not through the frame). We note running vs non-running up front so the truck has a liftgate or winch if needed.",
      },
      {
        title: "When open makes sense",
        body: "Daily drivers, dealer swaps, and most long-distance moves. Equipment is common on main lanes, so pricing and dates are usually easier than enclosed.",
        image: unsplashImage(
          "photo-1720127601642-7c3a7ba88f5f",
          "Semi truck on a multi-lane highway, representing busy auto transport lanes"
        ),
      },
      {
        title: "When to consider enclosed instead",
        body: "Fresh paint, very low cars, or high-value show cars often ride enclosed. We can quote open and enclosed side by side so you can compare.",
      },
    ],
    prepChecklist: {
      title: "Before your open carrier arrives",
      items: [
        "Wash the car enough to spot paint chips for the bill of lading walk-around.",
        "Remove toll tags, garage remotes, and aftermarket accessories that can flap loose.",
        "Keep fuel between a quarter and a half tank to keep weight predictable.",
        "Disable alarms or show the driver how to disarm quickly at pickup.",
        "Confirm gate codes, low branches, and HOA rules so the truck can stage legally.",
      ],
    },
  },
  {
    slug: "enclosed-transport",
    title: "Enclosed Transport",
    short: "Hard-sided trailer. Keeps weather and road spray off the car.",
    description:
      "Enclosed moves suit luxury cars, classics, and anything you do not want on an open rack. We book carriers with the right ramp and strap setup for your ride height.",
    highlights: [
      "Soft straps and low-angle ramps on qualified fleets",
      "Recommended for paint-sensitive finishes",
      "Typically 30 to 45 percent above open pricing depending on lane",
    ],
    heroImage: unsplashImage(
      "photo-1499147463149-adc471bbc639",
      "White enclosed cargo trailer used for protected vehicle transport"
    ),
    sections: [
      {
        title: "Hard-sided trailer",
        body: "Sides and roof keep rain and grit off the paint. Tie-downs use the carrier’s E-track and soft straps. Declared value and insurance limits are checked before pickup.",
      },
      {
        title: "Low cars",
        body: "Air suspension and low splitters need a shallow ramp angle. Tell us the ride height; we can send ramp photos on request or schedule extra clearance if needed.",
        image: unsplashImage(
          "photo-1776880258667-9efec18d59fb",
          "Enclosed trailer on a loading ramp for careful low-clearance loading"
        ),
      },
      {
        title: "Tight dates",
        body: "If you have a hard delivery date, say so when you book. We build in extra day where weather or distance warrants it.",
      },
    ],
    prepChecklist: {
      title: "Enclosed move checklist",
      items: [
        "Measure ground clearance and note any aftermarket splitters or diffusers.",
        "List alarm quirks, neutral tow steps, or air suspension presets for the driver.",
        "Photograph every panel in daylight and store the files on your phone.",
        "Remove personal items; cargo insurance covers the automobile, not gear in the trunk.",
        "Confirm delivery address clearance for a 53-foot trailer or plan a nearby lot.",
      ],
    },
  },
  {
    slug: "door-to-door-shipping",
    title: "Door-to-Door Shipping",
    short: "Pickup and delivery at or near your addresses when the truck can access them.",
    description:
      "We aim for your home or lot when width, weight, and HOA rules allow. If a 53-foot trailer cannot fit, we set a nearby meet point and keep one BOL chain where possible.",
    highlights: [
      "Residential and business locations supported",
      "Clear windows for pickup and delivery",
      "Status updates while the load is active",
    ],
    heroImage: unsplashImage(
      "photo-1659536806369-0114c406a20d",
      "Passenger car parked in a residential driveway in front of a home"
    ),
    sections: [
      {
        title: "What door-to-door means",
        body: "Truck goes to your driveway, dock, or dealer when it is legal and safe. If the street is too tight, we use a short meet point and put it on the order.",
      },
      {
        title: "City and gated pickups",
        body: "Tall gates and narrow alleys need a plan. Send photos or gate rules early so the carrier knows before they dispatch.",
        image: unsplashImage(
          "photo-1777117414555-30ab86382f81",
          "Urban freeway and residential skyline, illustrating metro pickup coordination"
        ),
      },
      {
        title: "Communication",
        body: "We give pickup and delivery windows in hours where we can, and update you if a prior stop runs long.",
      },
    ],
    prepChecklist: {
      title: "Door-to-door prep",
      items: [
        "Send photos of steep driveways, speed bumps, or gate codes for the guard shack.",
        "Tell us if a lowboy or bobtail is required because of a speed hump.",
        "Have a backup contact on site in case the primary signer is delayed.",
        "Clear snow or debris so the driver can walk the vehicle safely.",
        "Confirm who signs the bill of lading at delivery before the truck leaves origin.",
      ],
    },
  },
  {
    slug: "exotic-luxury-car-shipping",
    title: "Exotic & Luxury Car Shipping",
    short: "Enclosed moves for high-value and collector cars.",
    description:
      "Exotics and luxury cars usually ship enclosed with experienced drivers. We verify insurance limits against declared value and name who can sign at delivery.",
    highlights: [
      "Single-level enclosed when available",
      "Route and clearance planning",
      "Same broker contact from booking through delivery",
    ],
    heroImage: unsplashImage(
      "photo-1770446722312-0fcf39b62900",
      "High-end sports car parked at a residential garage entrance"
    ),
    sections: [
      {
        title: "Insurance and declared value",
        body: "We collect declared value and check the carrier’s certificate before pickup. If limits do not match, we switch carriers rather than run underinsured.",
      },
      {
        title: "Route planning",
        body: "Low cars need to avoid bad ramps and construction plates. Long moves may add buffer days for weather or mountain passes.",
        image: unsplashImage(
          "photo-1761868153234-ac1e23a1c653",
          "Sports car delivered at a suburban home"
        ),
      },
      {
        title: "Delivery options",
        body: "Garage delivery, lift help, or extra photos can be arranged when the location allows. Special manufacturer transport steps go on the BOL.",
      },
    ],
    prepChecklist: {
      title: "Exotic and luxury prep",
      items: [
        "Provide accurate dimensions including wings, mirrors, and roof racks.",
        "Share manufacturer transport mode steps for EV or hydraulic suspensions.",
        "List any ceramic coating cure dates so straps avoid fresh edges.",
        "Name every authorized signer; we do not release to unnamed third parties.",
        "Schedule a post-delivery paint meter reading if your lender requires it.",
      ],
    },
  },
  {
    slug: "motorcycle-shipping",
    title: "Motorcycle Shipping",
    short: "Pallet, crate, or motorcycle slot on a qualified trailer.",
    description:
      "We ship cruisers and sport bikes strapped in chocks or crated for long hauls. Tell us about lowered suspension, wide fairings, and exhaust so the setup fits.",
    highlights: [
      "Open and enclosed motorcycle options",
      "Crated shipping for maximum protection on long hauls",
      "Upfront questions on fairings and modifications for accurate quotes",
    ],
    heroImage: unsplashImage(
      "photo-1753563820255-3645ba2c44f0",
      "Motorcycle secured to a dedicated transport trailer in a lot"
    ),
    sections: [
      {
        title: "Open vs crated",
        body: "Short regional moves often go open on a pallet. Cross-country or winter moves may use a crate. We quote both when you ask.",
      },
      {
        title: "Tie-downs",
        body: "Soft ties on bars or frames per carrier practice. Non-running bikes need winch points noted in advance.",
        image: unsplashImage(
          "photo-1753563820285-113b135c54fd",
          "Motorcycle staged next to its trailer for tie-down and wheel chock prep"
        ),
      },
      {
        title: "Residential pickup",
        body: "Steep or unpaved driveways may need a meet on flat pavement nearby.",
        image: unsplashImage(
          "photo-1758846183017-6ea8242b5dfc",
          "Narrow residential driveway between homes where a transport truck may need a meet point"
        ),
      },
    ],
    prepChecklist: {
      title: "Motorcycle shipping prep",
      items: [
        "Drain fuel to the level your carrier requires and disable anti-theft if needed.",
        "Remove saddlebags and electronics if they are not part of the insured value.",
        "Note any fluid leaks so the driver can pad the deck accordingly.",
        "Share keys or fobs only after the inspection is complete and signed.",
        "Photograph both sides of the bike while it is upright on level ground.",
      ],
    },
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);
