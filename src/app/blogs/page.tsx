import Link from "next/link";
import type { Metadata } from "next";
import { canonicalAndSocial, clipMeta, pageTitle } from "@/lib/metadata";
import { getPublishedPosts } from "@/lib/blog-store";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: pageTitle("Blog"),
  description: clipMeta(
    `${COMPANY.name} publishes weekly lessons on transporting cars, estimating lanes, prepping vehicles, and working with dealers.`,
    160
  ),
  ...canonicalAndSocial(
    "/blogs",
    pageTitle("Blog"),
    `Long-form logistics articles prepared by ${COMPANY.name}: pricing trends, enclosed moves, motorcycles, relocation tips.`
  ),
};

export default function BlogsIndexPage() {
  const posts = getPublishedPosts();

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-14 lg:px-6 lg:py-20">
        <h1 className="font-heading text-4xl font-bold text-navy-900">Blog</h1>
        <p className="mt-3 text-lg text-slate-600">
          Shipping guides, lane tips, and how-tos from AutoCarship LLC.
        </p>
        <ul className="mt-12 space-y-4">
          {posts.length === 0 ? (
            <li className="rounded-card border border-slate-200 bg-white p-8 text-center text-slate-600">
              No articles yet. Check back soon.
            </li>
          ) : (
            posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blogs/${p.slug}`}
                  className="block rounded-card border border-slate-100 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
                >
                  <h2 className="font-heading text-xl font-bold text-navy-900">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {p.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-amber-700">
                    {new Date(p.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    · Read article →
                  </p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
