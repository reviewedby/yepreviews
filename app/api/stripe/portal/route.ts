import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
  }

  const { data: biz } = await supabase
    .from("businesses")
    .select("stripe_customer_id")
    .eq("owner_id", user.id)
    .single();

  if (!biz?.stripe_customer_id) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/settings`);
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: biz.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/settings`,
  });

  return NextResponse.redirect(session.url);
}
