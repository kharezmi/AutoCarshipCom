/** Heuristic: HTML posts from the rich editor start with a block tag. */
export function isLikelyHtml(content: string | undefined | null): boolean {
  if (!content) return false;
  const t = content.trimStart();
  return /^<(p|h[1-6]|div|ul|ol|img|blockquote|figure|article)/i.test(t);
}
