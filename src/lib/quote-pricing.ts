export type TransportType = "open" | "enclosed";
export type VehicleCondition = "running" | "inoperable";

/**
 * Ballpark total for the quote summary (uwon-style estimate).
 * Enclosed = 1.4× line-haul; non-running = +$150 flat per product spec.
 */
export function calculateEstimatedPrice(input: {
  distanceMiles: number;
  transportType: TransportType;
  condition: VehicleCondition;
}): number {
  const basePerMile = 1.12;
  const minimum = 549;
  let subtotal = Math.max(minimum, input.distanceMiles * basePerMile);
  if (input.transportType === "enclosed") subtotal *= 1.4;
  if (input.condition === "inoperable") subtotal += 150;
  return Math.round(subtotal);
}

/** Deterministic mock miles when ZIP-based distance is unavailable. */
export function mockDistanceMiles(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h + seed.charCodeAt(i) * (i + 3)) % 10007;
  }
  return 650 + (h % 2400);
}

export type QuoteInputs = {
  miles: number;
  transportType: TransportType;
  condition: VehicleCondition;
  expedited: boolean;
};

/** Ballpark estimator; swap in live tariff or rating engine when wired. */
export function computeQuoteEstimate(input: QuoteInputs): {
  subtotal: number;
  fees: { inoperable: number; expeditedPct: number };
  total: number;
} {
  const { miles, transportType, condition, expedited } = input;
  const basePerMile = 1.12;
  const minimum = 549;
  let subtotal = Math.max(minimum, miles * basePerMile);
  const transportMult = transportType === "enclosed" ? 1.4 : 1;
  subtotal *= transportMult;
  const inoperableFee = condition === "inoperable" ? 150 : 0;
  let total = subtotal + inoperableFee;
  const expeditedPct = expedited ? 0.2 : 0;
  if (expedited) total *= 1 + expeditedPct;
  return {
    subtotal: Math.round(subtotal),
    fees: { inoperable: inoperableFee, expeditedPct },
    total: Math.round(total),
  };
}

export function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
