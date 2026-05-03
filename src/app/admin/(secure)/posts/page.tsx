import Link from "next/link";
import { getAllPosts } from "@/lib/blog-store";
import { Button } from "@/components/ui/button";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";

export default async function AdminPostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy-900">
            Blog posts
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Drafts stay hidden from /blogs until you enable{" "}
            <span className="font-medium">Published</span>.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">New post</Link>
        </Button>
      </div>

      <ul className="mt-8 divide-y divide-slate-200 rounded-card border border-slate-200 bg-white">
        {posts.length === 0 ? (
          <li className="p-8 text-center text-slate-600">No posts yet.</li>
        ) : (
          posts.map((p) => (
            <li
              key={p.slug}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-heading font-bold text-navy-900">{p.title}</p>
                <p className="mt-1 font-mono text-xs text-slate-500">
                  /blogs/{p.slug}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {p.published ? (
                    <span className="text-emerald-700">Published</span>
                  ) : (
                    <span className="text-amber-700">Draft</span>
                  )}{" "}
                  · Updated {new Date(p.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/admin/posts/${p.slug}/edit`}>Edit</Link>
                </Button>
                {p.published && (
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/blogs/${p.slug}`} target="_blank">
                      View live
                    </Link>
                  </Button>
                )}
                <AdminDeleteButton slug={p.slug} title={p.title} />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
