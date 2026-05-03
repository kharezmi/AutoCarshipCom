"use client";

import { useState } from "react";
import { adminDeletePostForm } from "@/actions/blog-admin";
import { Button } from "@/components/ui/button";

export function AdminDeleteButton({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button
        type="button"
        size="sm"
        variant="ghost"
        className="text-red-600 hover:bg-red-50 hover:text-red-700"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
    );
  }

  return (
    <form action={adminDeletePostForm} className="flex items-center gap-2">
      <input type="hidden" name="slug" value={slug} />
      <span className="text-xs text-slate-600">Delete “{title}”?</span>
      <Button type="submit" size="sm" variant="outline" className="text-red-600">
        Confirm
      </Button>
      <Button type="button" size="sm" variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </form>
  );
}
