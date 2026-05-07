import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${siteUrl}/auth/callback?next=/onboarding`,
    cancel_url: `${siteUrl}/`,
    customer_email: user?.email,
    metadata: { user_id: user?.id ?? "" },
    subscription_data: {
      metadata: { user_id: user?.id ?? "" },
    },
  });

  return NextResponse.redirect(session.url!);
}
