import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  let payload: {
    business_id: string;
    employee_id?: string | null;
    rating: number;
    platform: "google" | "yelp" | "facebook";
  };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.from("review_clicks").insert({
    business_id: payload.business_id,
    employee_id: payload.employee_id ?? null,
    rating: payload.rating,
    platform: payload.platform,
  });

  if (error) {
    return NextResponse.json({ ok: false, error: "Failed to log click" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
