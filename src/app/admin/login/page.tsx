import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin/posts");

  const configured = Boolean(
    process.env.BLOG_ADMIN_PASSWORD && process.env.BLOG_ADMIN_SECRET
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-md rounded-card border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Blog admin
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in to create and edit SEO-friendly posts at{" "}
          <span className="font-mono text-xs">/blogs/your-post-slug</span>.
        </p>
        {!configured && (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950">
            <p className="font-semibold">Configure environment first</p>
            <p className="mt-1">
              In <code className="rounded bg-white px-1">web/.env.local</code>{" "}
              add:
            </p>
            <pre className="mt-2 overflow-x-auto rounded bg-white p-2 font-mono text-[11px] leading-relaxed">
              BLOG_ADMIN_PASSWORD=choose-a-strong-password{"\n"}
              BLOG_ADMIN_SECRET=at-least-16-random-characters
            </pre>
            <p className="mt-2 text-amber-900/90">
              Restart <code className="rounded bg-white px-1">npm run dev</code>{" "}
              after saving.
            </p>
          </div>
        )}
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
