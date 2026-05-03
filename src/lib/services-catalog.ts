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
    short:
      "Industry-standard ramps with quick scheduling and strong lane coverage.",
    description:
      "Open carriers move the majority of consumer vehicles in the U.S. Your vehicle is secured with professional tie-downs and shipped alongside other cars on a multi-level trailer. AutoCarship LLC matches the trailer height, deck space, and tie-down plan to your chassis before a truck ever rolls to your curb.",
    highlights: [
      "Best value for sedans, SUVs, and trucks",
      "Frequent availability on popular lanes",
      "Fully insured carriers in our network",
    ],
    heroImage: unsplashImage(
      "photo-1761917904658-2a9ecb84a169",
      "Car carrier semi truck hauling multiple vehicles on a highway"
    ),
    sections: [
      {
        title: "How open transport actually works",
        body: "Drivers load vehicles onto two-level racks using soft straps over the tires, never through the frame. The trailer stays balanced so crosswinds and bridge transitions stay predictable. We confirm running versus non-running status up front so the right liftgate or winch is on the truck before pickup day.",
      },
      {
        title: "Lanes where open shines",
        body: "Dealer trades, relocation moves, and student cars dominate open bookings because the equipment is everywhere. Snowbird lanes, coast-to-coast corporate transfers, and metro-to-metro dealer swaps all stay cost-effective on open decks while still using vetted cargo policies.",
        image: unsplashImage(
          "photo-1720127601642-7c3a7ba88f5f",
          "Semi truck on a multi-lane highway, representing busy auto transport lanes"
        ),
      },
      {
        title: "When we still recommend enclosed",
        body: "If you are moving a show car with fresh paint, a wide-body build with delicate aero, or a museum piece, enclosed may be worth the premium. Dispatch will quote both modes side by side so you can pick based on calendar and budget instead of guesswork.",
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
    short: "Maximum protection from weather and road debris.",
    description:
      "Enclosed trailers shield exotics, classics, and luxury vehicles from the elements. Hard sides keep rock chips off clear coat, and climate-stable rigs help sensitive finishes arrive the way they left. We prioritize single-level decks whenever height allows so loading angles stay gentle.",
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
        title: "What you get with a hard-sided trailer",
        body: "Walls block rain, snow, and road grit. E-track flooring lets crews position skates and soft ties without drilling into your frame. Many enclosed units also carry higher cargo limits, which matters when the vehicle value pushes insurance paperwork.",
      },
      {
        title: "Loading discipline for low cars",
        body: "Low splitters and air suspension need measured approach angles. We send photos of the ramp setup when customers request them, and we refuse rushed tie-downs that could scuff side skirts. If a lift is required, we schedule it before the truck leaves the yard.",
        image: unsplashImage(
          "photo-1776880258667-9efec18d59fb",
          "Enclosed trailer on a loading ramp for careful low-clearance loading"
        ),
      },
      {
        title: "Pairing enclosed with tight calendars",
        body: "Auction purchases, concours deadlines, and film fleet moves often need guaranteed windows. Dispatch blocks buffer days when weather threatens mountain passes and keeps backup drivers on standby for premium moves.",
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
    short:
      "Pickup and delivery as close to your addresses as legally and safely possible.",
    description:
      "Door-to-door means we fight for the closest legal handoff instead of forcing you into a remote terminal. Dispatch maps bridge heights, cul-de-sac turning radii, and city weight limits before assigning a truck. If a low-hanging oak branch or HOA rule blocks a 53-footer, we set a short meet point and still handle the paperwork.",
    highlights: [
      "Residential and business locations supported",
      "Clear windows for pickup and delivery",
      "Live updates when your shipment is active",
    ],
    heroImage: unsplashImage(
      "photo-1659536806369-0114c406a20d",
      "Passenger car parked in a residential driveway in front of a home"
    ),
    sections: [
      {
        title: "What door-to-door really means",
        body: "Carriers aim for your driveway, loading dock, or dealer lot. When a street is too narrow, the meet point might be a nearby big-box parking lot, but you still get a single bill of lading chain and the same driver team whenever possible.",
      },
      {
        title: "Urban pickups without drama",
        body: "City towers, gated communities, and downtown dealerships all need different staging plans. We collect photos of tight alleys, share them with the driver, and sometimes schedule early-morning pickups before traffic locks the lane.",
        image: unsplashImage(
          "photo-1777117414555-30ab86382f81",
          "Urban freeway and residential skyline, illustrating metro pickup coordination"
        ),
      },
      {
        title: "Communication you can rely on",
        body: "You get a dedicated coordinator who texts realistic ETA windows instead of vague day counts. If a previous stop runs long, we update both ends so nobody wastes a vacation day sitting curbside.",
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
    short: "White-glove logistics for six- and seven-figure vehicles.",
    description:
      "Lamborghini, Ferrari, McLaren, Rolls-Royce moves stay on enclosed equipment with veteran drivers and cargo limits that match the sticker price. We treat transport like a custody chain: verified pickup photos, sealed trailer logs when requested, and delivery only to named signers.",
    highlights: [
      "Single-level enclosed when available",
      "Route and clearance planning",
      "Dedicated coordinator from booking to delivery",
    ],
    heroImage: unsplashImage(
      "photo-1770446722312-0fcf39b62900",
      "High-end sports car parked at a residential garage entrance"
    ),
    sections: [
      {
        title: "Insurance limits that match the cargo",
        body: "High-value loads need paperwork that matches reality. We collect declared value, review carrier certificates, and flag any gap before pickup day. If a carrier cannot meet the limit, we rotate the booking instead of hoping nothing happens.",
      },
      {
        title: "Route planning beyond GPS",
        body: "Low cars hate surprise construction plates. Dispatch reviews state DOT notices, weather windows, and hotel staging lots ahead of multi-day moves. Night driving through deer-heavy counties gets avoided when possible.",
        image: unsplashImage(
          "photo-1761868153234-ac1e23a1c653",
          "Sports car delivered at a suburban home, emphasizing white-glove residential delivery"
        ),
      },
      {
        title: "White-glove delivery standards",
        body: "Inside delivery to a climate-controlled garage, lift-assisted unloading, and photo confirmation are all on the menu when facilities allow. If a manufacturer requires transport mode settings, we document them on the BOL.",
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
    short: "Cradles, chocks, and careful handling for two wheels.",
    description:
      "From Harleys to sport bikes, motorcycles are secured in pallets, crates, or dedicated motorcycle slots on specialized trailers. We ask about fairings, lowered suspensions, and aftermarket exhausts so the crate or chock setup matches the bike instead of bending a lever.",
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
        title: "Open vs crated motorcycle moves",
        body: "Open pallet moves work well for short regional hops when weather is stable. Crated or palletized service adds labor up front but shields fairings on cross-country hauls. We explain both price points before you commit.",
      },
      {
        title: "Strapping that respects controls",
        body: "Soft ties keep pressure off grips and levers. If a bike cannot roll because of a dead battery, we note winch points that will not scar chrome. Side stands stay up only when chocks allow; otherwise we keep the bike vertical with bar harnesses.",
        image: unsplashImage(
          "photo-1753563820285-113b135c54fd",
          "Motorcycle staged next to its trailer for tie-down and wheel chock prep"
        ),
      },
      {
        title: "Residential pickup realities",
        body: "Steep driveways and gravel turns can block pallet jacks. Dispatch may ask for a meet at a paved lot a few miles away. That small change keeps your frame straight and keeps the carrier on schedule for the rest of the load.",
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
