import type { RichImage } from "@/lib/content-types";

/**
 * Build a hotlinked Unsplash image URL (IDs verified to resolve; use `photo-…` slug only).
 * @see https://unsplash.com/documentation#hotlinking
 */
export function unsplashImage(photoPath: string, alt: string): RichImage {
  const src = `https://images.unsplash.com/${photoPath}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=85`;
  return { src, alt };
}
