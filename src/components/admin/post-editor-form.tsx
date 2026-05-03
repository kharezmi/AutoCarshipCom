"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useMemo, useRef, useState } from "react";
import { adminSavePost, type ActionState } from "@/actions/blog-admin";
import { slugifyTitle } from "@/lib/blog-types";
import type { BlogPost } from "@/lib/blog-types";
import { isLikelyHtml } from "@/lib/blog-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BlogRichEditor,
  type BlogRichEditorHandle,
} from "@/components/admin/blog-rich-editor";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : label}
    </Button>
  );
}

export function PostEditorForm({
  mode,
  initial,
}: {
  mode: "create" | "edit";
  initial?: BlogPost | null;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [state, formAction] = useFormState(adminSavePost, {} as ActionState);
  const editorRef = useRef<BlogRichEditorHandle>(null);
  const hiddenContentRef = useRef<HTMLInputElement>(null);
  const [editorError, setEditorError] = useState<string | null>(null);

  const suggested = useMemo(() => slugifyTitle(title), [title]);

  const initialFormat: "html" | "markdown" =
    initial?.contentFormat === "html" || isLikelyHtml(initial?.content)
      ? "html"
      : "markdown";

  return (
    <form
      action={formAction}
      className="space-y-6"
      onSubmit={(e) => {
        setEditorError(null);
        const ed = editorRef.current;
        const hidden = hiddenContentRef.current;
        if (!ed || !hidden) return;
        if (ed.isEmpty()) {
          e.preventDefault();
          setEditorError("Add some body content before saving.");
          return;
        }
        hidden.value = ed.getHtml();
      }}
    >
      <input type="hidden" name="mode" value={mode} />
      <input ref={hiddenContentRef} type="hidden" name="content" defaultValue="" />
      {mode === "edit" && initial && (
        <input type="hidden" name="slugOriginal" value={initial.slug} />
      )}

      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1.5"
          placeholder="e.g. How to ship a car from Florida to Massachusetts"
        />
      </div>

      {mode === "create" && (
        <div>
          <Label htmlFor="slug">URL slug (optional)</Label>
          <Input
            id="slug"
            name="slug"
            className="mt-1.5 font-mono text-sm"
            placeholder={suggested || "how-to-ship-a-car-from-fl-to-ma"}
          />
          <p className="mt-1 text-xs text-slate-500">
            Leave blank to auto-generate from title:{" "}
            <span className="font-mono text-navy-800">{suggested || "(not set)"}</span>
          </p>
        </div>
      )}

      {mode === "edit" && initial && (
        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Public URL:</span>{" "}
          <span className="font-mono text-navy-900">/blogs/{initial.slug}</span>
          <p className="mt-2 text-xs">
            Slug is fixed after publish so external links stay valid. Delete and
            recreate to change the URL.
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="description">Meta description (SEO)</Label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={initial?.description ?? ""}
          className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900"
          placeholder="150-160 characters ideal for Google."
        />
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          name="author"
          defaultValue={initial?.author ?? "AutoCarship LLC"}
          className="mt-1.5"
        />
      </div>

      <div>
        <Label>Article body</Label>
        <p className="mt-1 text-xs text-slate-500">
          Use the toolbar for bold, headings, lists, links, and images. Older
          posts written in Markdown still load correctly.
        </p>
        <div className="mt-2">
          <BlogRichEditor
            ref={editorRef}
            initialContent={initial?.content ?? ""}
            initialFormat={initialFormat}
          />
        </div>
        {editorError && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {editorError}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 rounded border-slate-300 text-navy-900 focus:ring-navy-900"
        />
        Published (visible on /blogs and search engines)
      </label>

      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Submit label={mode === "create" ? "Create post" : "Save changes"} />
      </div>
    </form>
  );
}
