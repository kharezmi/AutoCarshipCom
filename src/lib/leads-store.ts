import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import type {
  ContactLeadData,
  LeadSource,
  QuoteLeadData,
  StoredLead,
} from "@/lib/leads-types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "leads.json");
const MAX_LEADS = 2500;

type Store = { leads: StoredLead[] };

function readStore(): Store {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.leads || !Array.isArray(parsed.leads)) return { leads: [] };
    return parsed;
  } catch {
    return { leads: [] };
  }
}

function writeStore(store: Store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let { leads } = store;
  if (leads.length > MAX_LEADS) {
    leads = leads.slice(0, MAX_LEADS);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify({ leads }, null, 2), "utf-8");
}

export function appendLead(source: LeadSource, data: QuoteLeadData | ContactLeadData) {
  try {
    const store = readStore();
    const lead: StoredLead = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      source,
      data,
    };
    store.leads.unshift(lead);
    writeStore(store);
  } catch (e) {
    console.error("[leads-store] Failed to append lead:", e);
  }
}

export function getLeads(): StoredLead[] {
  return readStore().leads;
}

export function getLeadById(id: string): StoredLead | null {
  return readStore().leads.find((l) => l.id === id) ?? null;
}
