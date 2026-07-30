/**
 * True once the Supabase env keys are filled in. Until then the app runs in
 * "preview mode": the catalog serves sample data, orders/contacts are accepted
 * but not persisted, and the dashboard uses the preview password login.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
