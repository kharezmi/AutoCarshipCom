import fs from "fs";
import path from "path";
import type { BlogPost } from "@/lib/blog-types";
import { isValidSlug } from "@/lib/blog-types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blogs.json");

type Store = { posts: BlogPost[] };

function readStore(): Store {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Store;
    if (!parsed.posts || !Array.isArray(parsed.posts)) return { posts: [] };
    return parsed;
  } catch {
    return { posts: [] };
  }
}

function writeStore(store: Store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function getAllPosts(): BlogPost[] {
  return readStore().posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.published);
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!isValidSlug(slug)) return null;
  return readStore().posts.find((p) => p.slug === slug) ?? null;
}

export function getPublishedSlugs(): string[] {
  return getPublishedPosts().map((p) => p.slug);
}

export function savePost(post: BlogPost): { ok: true } | { ok: false; error: string } {
  if (!isValidSlug(post.slug)) {
    return { ok: false, error: "Invalid URL slug. Use lowercase letters, numbers, and hyphens only." };
  }
  const store = readStore();
  const idx = store.posts.findIndex((p) => p.slug === post.slug);
  const next = { ...post, updatedAt: new Date().toISOString() };
  if (idx === -1) {
    store.posts.push(next);
  } else {
    store.posts[idx] = { ...next, publishedAt: store.posts[idx].publishedAt };
  }
  writeStore(store);
  return { ok: true };
}

export function deletePost(slug: string): boolean {
  const store = readStore();
  const before = store.posts.length;
  store.posts = store.posts.filter((p) => p.slug !== slug);
  if (store.posts.length === before) return false;
  writeStore(store);
  return true;
}
