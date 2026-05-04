import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export type PromoSubscriber = {
  id: string;
  createdAt: string;
  email: string;
  name: string | null;
  source: "promo_modal";
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "promo-subscribers.json");
const MAX_ROWS = 5000;

type Store = { subscribers: PromoSubscriber[] };

function readStore(): Store {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.subscribers || !Array.isArray(parsed.subscribers)) return { subscribers: [] };
    return parsed;
  } catch {
    return { subscribers: [] };
  }
}

function writeStore(store: Store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  let { subscribers } = store;
  if (subscribers.length > MAX_ROWS) {
    subscribers = subscribers.slice(0, MAX_ROWS);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify({ subscribers }, null, 2), "utf-8");
}

export function appendPromoSubscriber(email: string, name: string | null) {
  const row: PromoSubscriber = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    email: email.trim().toLowerCase(),
    name: name?.trim() || null,
    source: "promo_modal",
  };
  try {
    const store = readStore();
    store.subscribers.unshift(row);
    writeStore(store);
  } catch (e) {
    console.error("[promo-subscribers-store] append failed:", e);
  }
}
