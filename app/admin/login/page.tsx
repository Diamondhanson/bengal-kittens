import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getAdminSession } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin sign in",
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session.isAdmin) redirect("/admin");

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt=""
            width={72}
            height={72}
            className="mx-auto h-18 w-18"
          />
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink-900">
            {site.name} dashboard
          </h1>
          <p className="mt-2 text-sm text-ink-500">
            Owner access only. Sign in to manage kittens, orders, and messages.
          </p>
        </div>
        <div className="mt-8 rounded-3xl border border-cream-300 bg-white p-8 shadow-sm">
          <LoginForm previewMode={!isSupabaseConfigured()} />
        </div>
        <p className="mt-6 text-center text-sm">
          <Link href="/" className="font-bold text-ink-400 hover:text-clay-600">
            ← Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
