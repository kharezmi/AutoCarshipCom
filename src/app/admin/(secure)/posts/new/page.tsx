import { PostEditorForm } from "@/components/admin/post-editor-form";

export default function AdminNewPostPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy-900">New post</h1>
      <p className="mt-1 text-sm text-slate-600">
        URLs look like{" "}
        <code className="rounded bg-white px-1 font-mono text-xs">
          /blogs/your-slug-here
        </code>
        . Use clear, hyphenated slugs for SEO.
      </p>
      <div className="mt-8 max-w-3xl rounded-card border border-slate-200 bg-white p-6 shadow-sm">
        <PostEditorForm mode="create" />
      </div>
    </div>
  );
}
