import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { ManageTeam } from "./manage-team";

export default async function TeamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, slug, name")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) return null;

  const { data: employees } = await supabase
    .from("employees")
    .select("*")
    .eq("business_id", biz.id)
    .order("created_at");

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink tracking-tight">Team</h1>
        <p className="text-sm text-ink-60 mt-0.5">
          Each team member gets their own QR link at{" "}
          <span className="font-mono text-xs">yep.app/r/{biz.slug}/[name]</span>
        </p>
      </div>

      <ManageTeam business={biz} initialEmployees={employees ?? []} />
    </div>
  );
}
