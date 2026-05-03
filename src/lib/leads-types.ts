export type LeadSource = "quote" | "contact";

/** Snapshot from instant quote submit */
export type QuoteLeadData = {
  originZip: string;
  destZip: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  condition: string;
  transportType: string;
  shipDate: string;
  expedited: boolean;
  name: string;
  phone: string;
  email: string;
  /** User consented to transactional SMS on quote submit. */
  smsConsent: boolean;
  miles?: number;
  estimatedTotal?: number;
};

/** Snapshot from contact multi-step form */
export type ContactLeadData = {
  name: string;
  email: string;
  phone: string;
  moveType: string;
  origin: string;
  destination: string;
  notes?: string;
};

export type StoredLead = {
  id: string;
  createdAt: string;
  source: LeadSource;
  data: QuoteLeadData | ContactLeadData;
};
