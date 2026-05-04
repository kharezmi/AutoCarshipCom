import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { COMPANY, SITE_URL } from "@/lib/constants";
import { clipMeta, pageTitle } from "@/lib/metadata";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-assets";
import { getPostBySlug, getPublishedSlugs } from "@/lib/blog-store";

type Props = { params: { slug: string } };

export const dynamicParams = true;
export const revalidate = 120;

export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) {
    return { title: "Article" };
  }
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}/blogs/${post.slug}`;
  const description = clipMeta(post.description, 160);
  return {
    title: pageTitle(post.title),
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      siteName: COMPANY.name,
      locale: "en_US",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${COMPANY.name} publishes auto transport logistics articles.`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post || !post.published) notFound();

  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}/blogs/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: COMPANY.name,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
        <nav className="text-sm text-slate-500">
          <Link href="/blogs" className="hover:text-navy-900">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">{post.title}</span>
        </nav>
        <header className="mt-6 border-b border-slate-100 pb-10">
          <h1 className="font-heading text-4xl font-bold leading-tight text-navy-900 sm:text-[2.4rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {post.description}
          </p>
          <p className="mt-6 text-sm text-slate-500">
            <span className="font-medium text-slate-700">{post.author}</span>
            {", "}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.updatedAt !== post.publishedAt && (
              <>
                {". "}
                Updated{" "}
                <time dateTime={post.updatedAt}>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </time>
              </>
            )}
          </p>
        </header>
        <div className="py-10">
          <ArticleBody
            content={post.content}
            contentFormat={post.contentFormat}
          />
        </div>
        <div className="border-t border-slate-100 pt-8">
          <Link
            href="/blogs"
            className="text-sm font-semibold text-amber-700 hover:text-amber-600"
          >
            ← Back to all articles
          </Link>
        </div>
      </div>
    </article>
  );
}
