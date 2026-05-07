import { createClient } from "@/lib/supabase/server";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) return null;

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink tracking-tight">Settings</h1>
        <p className="text-sm text-ink-60 mt-0.5">Business configuration and billing</p>
      </div>

      <SettingsForm business={biz} />

      {/* Billing */}
      <div
        className="mt-6 bg-paper border border-ink-10 rounded-xl p-5"
        style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
      >
        <div className="text-sm font-semibold text-ink mb-1">Billing</div>
        <div className="text-xs text-ink-60 mb-4">
          $99/month · {biz.subscription_status === "active" ? "Active subscription" : biz.subscription_status}
        </div>
        <a
          href="/api/stripe/portal"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
        >
          Manage billing →
        </a>
      </div>
    </div>
  );
}
