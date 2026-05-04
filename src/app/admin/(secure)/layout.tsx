import Link from "next/link";
import { redirect } from "next/navigation";
import { adminLogout } from "@/actions/blog-admin";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { Button } from "@/components/ui/button";

export default async function AdminSecureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-surface">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-navy-900">
            <Link href="/admin/posts" className="hover:text-amber-600">
              Posts
            </Link>
            <Link href="/admin/posts/new" className="hover:text-amber-600">
              New post
            </Link>
            <Link href="/admin/leads" className="hover:text-amber-600">
              Leads
            </Link>
            <Link href="/blogs" className="font-normal text-slate-600 hover:text-navy-900">
              View blog
            </Link>
          </div>
          <form action={adminLogout}>
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-8 lg:px-6">{children}</div>
    </div>
  );
}
