import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";
import type Stripe from "stripe";
import type { SubscriptionStatus } from "@/types";

function stripeStatusToLocal(status: string): SubscriptionStatus {
  if (status === "active") return "active";
  if (status === "past_due") return "past_due";
  if (status === "canceled") return "canceled";
  return "incomplete";
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createServiceClient();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Response<Stripe.Checkout.Session>;
    const customerId = session.customer as string;
    const userId = session.metadata?.user_id;
    if (userId) {
      await supabase
        .from("businesses")
        .update({ stripe_customer_id: customerId, subscription_status: "active" })
        .eq("owner_id", userId);
    }
  } else if (
    event.type === "customer.subscription.updated" ||
    event.type === "customer.subscription.deleted"
  ) {
    const sub = event.data.object as Stripe.Response<Stripe.Subscription>;
    const customerId = sub.customer as string;
    const userId = sub.metadata?.user_id;
    const status = stripeStatusToLocal(sub.status);
    if (userId) {
      await supabase
        .from("businesses")
        .update({ stripe_customer_id: customerId, subscription_status: status })
        .eq("owner_id", userId);
    }
  }

  return NextResponse.json({ received: true });
}
