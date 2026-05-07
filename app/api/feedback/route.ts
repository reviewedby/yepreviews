import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendFeedbackNotification } from "@/lib/resend";

interface FeedbackPayload {
  business_id: string;
  employee_id: string | null;
  rating: number;
  categories: string[];
  body?: string;
  contact_email?: string;
  contact_phone?: string;
}

// Simple in-memory rate limit: 3 per IP per hour
const ipCounts = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry || now > entry.reset) {
    ipCounts.set(ip, { count: 1, reset: now + 3_600_000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, error: "Rate limit exceeded" }, { status: 429 });
  }

  let payload: FeedbackPayload;
  try {
    payload = await req.json() as FeedbackPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.business_id || typeof payload.rating !== "number") {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("feedback")
    .insert({
      business_id: payload.business_id,
      employee_id: payload.employee_id ?? null,
      rating: payload.rating,
      categories: payload.categories ?? [],
      body: payload.body ?? null,
      contact_email: payload.contact_email ?? null,
      contact_phone: payload.contact_phone ?? null,
      status: "new" as const,
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json({ ok: false, error: "Failed to save feedback" }, { status: 500 });
  }

  // Email notification — fire and forget
  (async () => {
    try {
      const { data: biz } = await supabase
        .from("businesses")
        .select("name, owner_id")
        .eq("id", payload.business_id)
        .single();

      if (!biz) return;

      const { data: adminData } = await supabase.auth.admin.getUserById(biz.owner_id);
      const ownerEmail = adminData?.user?.email;
      if (!ownerEmail) return;

      let employeeName: string | undefined;
      if (payload.employee_id) {
        const { data: emp } = await supabase
          .from("employees")
          .select("name")
          .eq("id", payload.employee_id)
          .single();
        employeeName = emp?.name ?? undefined;
      }

      await sendFeedbackNotification({
        ownerEmail,
        businessName: biz.name,
        employeeName,
        rating: payload.rating,
        categories: payload.categories ?? [],
        body: payload.body,
        contactEmail: payload.contact_email,
        contactPhone: payload.contact_phone,
        feedbackId: data.id,
      });
    } catch (err) {
      console.error("Email notification failed:", err);
    }
  })();

  return NextResponse.json({ ok: true, data: { id: data.id } });
}
