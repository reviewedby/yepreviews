import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Feedback, Employee } from "@/types";
import { UpdateFeedbackStatus } from "./update-status";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function FeedbackDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) redirect("/dashboard");

  const { data: feedbackData } = await supabase
    .from("feedback")
    .select("*, employee:employees(id,name,role,slug)")
    .eq("id", id)
    .eq("business_id", biz.id)
    .single();

  if (!feedbackData) notFound();
  const f = feedbackData as Feedback & { employee: Employee | null };

  // Mark as read if new
  if (f.status === "new") {
    await supabase.from("feedback").update({ status: "read" }).eq("id", id);
  }

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/feedback" className="text-sm text-ink-60 hover:text-ink mb-6 inline-flex items-center gap-1.5">
        ← Back to inbox
      </Link>

      <div className="mt-4 mb-6 flex items-start gap-4">
        {f.employee ? (
          <Avatar seed={f.employee.name} size={48} />
        ) : (
          <div className="w-12 h-12 rounded-full bg-ink-10 flex items-center justify-center text-xl text-ink-40">?</div>
        )}
        <div>
          <div className="flex gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                  fill={i <= f.rating ? "#f5b700" : "#d5d7dd"}
                />
              </svg>
            ))}
          </div>
          {f.employee && (
            <div className="text-sm font-semibold text-ink">{f.employee.name} · {f.employee.role}</div>
          )}
          <div className="text-xs text-ink-40">{new Date(f.created_at).toLocaleString()}</div>
        </div>
      </div>

      {/* Categories */}
      {f.categories.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {f.categories.map((c) => (
            <span key={c} className="text-xs bg-ink-05 text-ink-60 px-2.5 py-1 rounded-full font-medium">{c}</span>
          ))}
        </div>
      )}

      {/* Body */}
      {f.body && (
        <div
          className="bg-paper-warm border border-ink-10 rounded-xl px-4 py-4 mb-5 text-sm text-ink-80 leading-relaxed"
        >
          &ldquo;{f.body}&rdquo;
        </div>
      )}

      {/* Contact */}
      {(f.contact_email || f.contact_phone) && (
        <div className="bg-paper border border-ink-10 rounded-xl px-4 py-3 mb-5">
          <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2">Contact info</div>
          {f.contact_email && (
            <a href={`mailto:${f.contact_email}`} className="text-sm text-accent hover:underline block">
              {f.contact_email}
            </a>
          )}
          {f.contact_phone && (
            <a href={`tel:${f.contact_phone}`} className="text-sm text-ink hover:underline block">
              {f.contact_phone}
            </a>
          )}
        </div>
      )}

      {/* Owner notes */}
      <div className="mb-5">
        <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2">Notes (private)</div>
        <textarea
          defaultValue={f.owner_notes ?? ""}
          placeholder="Add internal notes..."
          rows={3}
          className="input-base resize-none text-sm"
        />
      </div>

      {/* Status actions */}
      <UpdateFeedbackStatus feedbackId={f.id} currentStatus={f.status} />
    </div>
  );
}
