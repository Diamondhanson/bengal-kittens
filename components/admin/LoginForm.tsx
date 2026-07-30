"use client";

import { useActionState } from "react";
import { login, type AuthFormState } from "@/app/actions/auth";
import { SubmitButton } from "@/components/SubmitButton";

const inputClass =
  "w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-300 focus:border-clay-400 focus:outline-none focus:ring-2 focus:ring-clay-200";

export function LoginForm({ previewMode }: { previewMode: boolean }) {
  const [state, action] = useActionState<AuthFormState, FormData>(login, {});

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-ink-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="you@example.com"
          autoComplete="username"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-bold text-ink-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={inputClass}
          autoComplete="current-password"
        />
      </div>

      {state.error && (
        <p className="rounded-xl bg-clay-100 px-4 py-3 text-sm font-semibold text-clay-700">
          {state.error}
        </p>
      )}

      {previewMode && (
        <p className="rounded-xl bg-moss-100 px-4 py-3 text-sm text-moss-700">
          <strong>Preview mode:</strong> Supabase isn't connected yet, so use
          any email with the preview password (default{" "}
          <code className="font-mono font-bold">preview</code>, set via{" "}
          <code className="font-mono">ADMIN_PREVIEW_PASSWORD</code>). Once your
          Supabase keys are in <code className="font-mono">.env.local</code>,
          this switches to your real admin account.
        </p>
      )}

      <SubmitButton pendingText="Signing in…" className="w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
