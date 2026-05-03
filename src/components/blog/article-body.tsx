import DOMPurify from "isomorphic-dompurify";
import { MarkdownBody } from "@/components/blog/markdown-body";
import { isLikelyHtml } from "@/lib/blog-format";

function shouldRenderMarkdown(
  content: string,
  contentFormat?: "html" | "markdown"
): boolean {
  if (contentFormat === "markdown") return true;
  if (contentFormat === "html") return false;
  return !isLikelyHtml(content);
}

export function ArticleBody({
  content,
  contentFormat,
}: {
  content: string;
  contentFormat?: "html" | "markdown";
}) {
  if (shouldRenderMarkdown(content, contentFormat)) {
    return <MarkdownBody markdown={content} />;
  }

  const clean = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className="blog-article-html space-y-4 text-slate-800"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
