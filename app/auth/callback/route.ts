import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Check if user has a business (i.e., completed onboarding)
        const { data: biz } = await supabase
          .from("businesses")
          .select("id, subscription_status")
          .eq("owner_id", user.id)
          .single();

        if (!biz) {
          return NextResponse.redirect(`${origin}/onboarding`);
        }
        if (biz.subscription_status !== "active") {
          return NextResponse.redirect(`${origin}/api/stripe/checkout`);
        }
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
