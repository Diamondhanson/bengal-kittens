"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  pendingText = "Sending…",
  className = "",
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-xl bg-clay-500 px-6 py-3 font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-clay-600 hover:shadow-md active:translate-y-0 active:scale-95 disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {pending ? pendingText : children}
    </button>
  );
}
