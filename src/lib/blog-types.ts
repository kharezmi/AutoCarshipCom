export type BlogPost = {
  slug: string;
  title: string;
  /** Meta description for SEO (~150 chars) */
  description: string;
  /** Rich HTML (TipTap) or legacy Markdown */
  content: string;
  /** Set for new posts from admin; legacy posts omit and use heuristics */
  contentFormat?: "html" | "markdown";
  author: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
};

export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length >= 3 && slug.length <= 120;
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}
