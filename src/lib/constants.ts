/** Legal entity for SMS disclosures, privacy, and terms (matches autocarship.com). */
export const LEGAL_ENTITY =
  "Auto Car Ship LLC (a registered trade name of Auto Haul Express LLC)";

export const COMPANY = {
  name: "AutoCarship LLC",
  tagline: "Nationwide Auto Transport",
  phone: "+1 509 253-9660",
  phoneTel: "+15092539660",
  email: "quotes@autocarship.com",
  addressLine: "18110 US-27",
  cityStateZip: "Lake Wales, FL 33859, United States",
  dot: "US DOT: 4197700",
  mc: "MC: 1618777",
  fmcsa: "FMCSA Licensed Broker",
  hours: "Mon-Fri: 8AM - 7PM EST",
  socialFacebook: "https://www.facebook.com/autocarship",
  socialInstagram: "https://www.instagram.com/autocarship",
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://autocarship.com";

/** Promo popup. Adjust copy anytime. */
export const PROMO_MODAL = {
  headline: "Get 10% off",
  sublinePrefix: "Your first vehicle shipment with",
  description: "Sign up for email: promos and lane updates from our office.",
  ctaLabel: "Claim my 10% discount",
  dismissLabel: "No thanks",
} as const;

export const PARTNERED_COMPANIES = [
  "Intermount",
  "Professional Auto Haulers",
  "Professional Auto Carriers",
  "West Coast",
  "Motion Auto Carriers",
  "Fifth Wheel Transport",
] as const;
