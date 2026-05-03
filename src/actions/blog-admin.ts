"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  createAdminSessionToken,
  isAdminAuthenticated,
  setAdminSessionCookie,
} from "@/lib/admin-session";
import type { BlogPost } from "@/lib/blog-types";
import { isValidSlug, slugifyTitle } from "@/lib/blog-types";
import {
  deletePost,
  getPostBySlug,
  savePost,
} from "@/lib/blog-store";

export type ActionState = { error?: string; ok?: boolean };

export async function adminLogin(
  _prev: ActionState | void,
  formData: FormData
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  const expected = process.env.BLOG_ADMIN_PASSWORD;
  if (!expected) {
    return {
      error:
        "BLOG_ADMIN_PASSWORD is not set. Add it to web/.env.local (see comments in admin login page).",
    };
  }
  if (password !== expected) return { error: "Invalid password." };
  try {
    const token = createAdminSessionToken();
    await setAdminSessionCookie(token);
  } catch (e) {
    return {
      error:
        e instanceof Error
          ? e.message
          : "Could not create session. Set BLOG_ADMIN_SECRET (16+ chars) in .env.local.",
    };
  }
  redirect("/admin/posts");
}

export async function adminLogout() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function adminSavePost(
  _prev: ActionState | void,
  formData: FormData
): Promise<ActionState> {
  if (!(await isAdminAuthenticated())) return { error: "Unauthorized." };

  const mode = String(formData.get("mode") ?? "create");
  const slugOriginal = String(formData.get("slugOriginal") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const author = String(formData.get("author") ?? "AutoCarship LLC").trim();
  const published = formData.get("published") === "on";

  if (!title) return { error: "Title is required." };
  if (!description) return { error: "Meta description is required for SEO." };
  if (!content.trim()) return { error: "Body content is required." };

  const finalSlug =
    mode === "edit" && slugOriginal
      ? slugOriginal
      : isValidSlug(slug)
        ? slug
        : slugifyTitle(title);

  if (!isValidSlug(finalSlug)) {
    return {
      error:
        "Invalid slug. Use lowercase letters, numbers, and single hyphens (e.g. how-to-ship-a-car-from-fl-to-ma).",
    };
  }

  const now = new Date().toISOString();
  const existing =
    mode === "edit" && slugOriginal ? getPostBySlug(slugOriginal) : null;

  const post: BlogPost = {
    slug: finalSlug,
    title,
    description: description.slice(0, 320),
    content,
    contentFormat: "html",
    author: author || "AutoCarship LLC",
    publishedAt: existing?.publishedAt ?? now,
    updatedAt: now,
    published,
  };

  const result = savePost(post);
  if (!result.ok) return { error: result.error };

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${finalSlug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export async function adminDeletePostForm(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  if (!slug) redirect("/admin/posts");
  deletePost(slug);
  revalidatePath("/blogs");
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export async function suggestSlugFromTitle(title: string): Promise<string> {
  return slugifyTitle(title);
}
