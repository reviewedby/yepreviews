import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Feedback, Employee } from "@/types";

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; rating?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, star_threshold")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) return null;

  let query = supabase
    .from("feedback")
    .select("*, employee:employees(id,name,role,slug)")
    .eq("business_id", biz.id)
    .order("created_at", { ascending: false });

  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status);
  }

  const { data: feedbackData } = await query;
  const feedback = (feedbackData ?? []) as (Feedback & { employee: Employee | null })[];

  const tabs = [
    { label: "All", value: "all", count: null },
    { label: "New", value: "new", count: feedback.filter((f) => f.status === "new").length },
    { label: "Read", value: "read", count: null },
    { label: "Followed up", value: "followed_up", count: null },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink tracking-tight">Feedback inbox</h1>
        <p className="text-sm text-ink-60 mt-0.5">{feedback.length} private feedback submissions</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-ink-05 rounded-xl p-1 w-fit">
        {tabs.map((t) => (
          <Link
            key={t.value}
            href={`/feedback${t.value !== "all" ? `?status=${t.value}` : ""}`}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
            style={{
              background: (!params.status && t.value === "all") || params.status === t.value ? "#fff" : "transparent",
              color: (!params.status && t.value === "all") || params.status === t.value ? "#0e1220" : "#5b5f6e",
              boxShadow: (!params.status && t.value === "all") || params.status === t.value
                ? "0 1px 3px rgba(14,18,32,0.06)"
                : "none",
            }}
          >
            {t.label}
            {t.count !== null && t.count > 0 && (
              <span className="bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {t.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Feedback list */}
      <div className="flex flex-col gap-2">
        {feedback.length === 0 ? (
          <div className="py-16 text-center text-sm text-ink-40">No feedback yet.</div>
        ) : (
          feedback.map((f) => (
            <Link
              key={f.id}
              href={`/feedback/${f.id}`}
              className="flex items-start gap-3 p-4 bg-paper rounded-xl border border-ink-10 hover:border-accent/30 transition-colors"
              style={{
                borderLeft: `3px solid ${f.rating <= 2 ? "#e04e4e" : f.rating === 3 ? "#e8a033" : "#e9eaee"}`,
                opacity: f.status === "followed_up" ? 0.7 : 1,
              }}
            >
              {f.status === "new" && (
                <div className="w-2 h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              )}
              <div>
                {f.employee ? (
                  <Avatar seed={f.employee.name} size={28} />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-ink-10 flex items-center justify-center text-xs text-ink-60">?</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <StarRow rating={f.rating} />
                  {f.employee && <span className="text-xs font-semibold text-ink">{f.employee.name}</span>}
                  <StatusBadge status={f.status} />
                  <span className="text-xs text-ink-40 ml-auto">
                    {new Date(f.created_at).toLocaleDateString()}
                  </span>
                </div>
                {f.categories.length > 0 && (
                  <div className="flex gap-1 mb-1">
                    {f.categories.map((c) => (
                      <span key={c} className="text-xs bg-ink-05 text-ink-60 px-1.5 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                )}
                {f.body && (
                  <p className="text-xs text-ink-80 leading-relaxed line-clamp-2">&ldquo;{f.body}&rdquo;</p>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <path
            d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
            fill={i <= rating ? "#f5b700" : "#d5d7dd"}
          />
        </svg>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "new") return null;
  return (
    <span
      className="text-xs font-medium px-1.5 py-0.5 rounded"
      style={{
        background: status === "followed_up" ? "#e3f6ee" : "#f4f5f7",
        color: status === "followed_up" ? "#12a66a" : "#5b5f6e",
      }}
    >
      {status === "followed_up" ? "Followed up" : "Read"}
    </span>
  );
}
