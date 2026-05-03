import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-store";
import { PostEditorForm } from "@/components/admin/post-editor-form";

type Props = { params: { slug: string } };

export default function AdminEditPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy-900">Edit post</h1>
      <p className="mt-1 text-sm text-slate-600">{post.title}</p>
      <div className="mt-8 max-w-3xl rounded-card border border-slate-200 bg-white p-6 shadow-sm">
        <PostEditorForm mode="edit" initial={post} />
      </div>
    </div>
  );
}
