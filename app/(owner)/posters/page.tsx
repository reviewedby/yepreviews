import { createClient } from "@/lib/supabase/server";
import { PosterGenerator } from "./poster-generator";

export default async function PostersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, name, slug")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) return null;

  const { data: employees } = await supabase
    .from("employees")
    .select("id, name, role, slug")
    .eq("business_id", biz.id)
    .eq("active", true)
    .order("name");

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink tracking-tight">QR Posters</h1>
        <p className="text-sm text-ink-60 mt-0.5">
          Generate and print QR posters for your business or individual team members.
        </p>
      </div>

      <PosterGenerator
        business={biz}
        employees={employees ?? []}
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL ?? "https://yep.app"}
      />
    </div>
  );
}
