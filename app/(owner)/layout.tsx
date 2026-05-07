import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, name, slug, subscription_status")
    .eq("owner_id", user.id)
    .single();

  if (!biz) redirect("/onboarding");
  if (biz.subscription_status !== "active") redirect("/api/stripe/checkout");

  return (
    <div className="flex h-screen bg-paper-warm overflow-hidden">
      <Sidebar business={biz} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
