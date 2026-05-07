import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import type { Feedback, Employee } from "@/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: biz } = await supabase
    .from("businesses")
    .select("id, name, slug, star_threshold")
    .eq("owner_id", user!.id)
    .single();

  if (!biz) return null;

  const { data: allFeedback } = await supabase
    .from("feedback")
    .select("*, employee:employees(id,name,role,slug)")
    .eq("business_id", biz.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: clicksData } = await supabase
    .from("review_clicks")
    .select("id")
    .eq("business_id", biz.id);

  const feedback = (allFeedback ?? []) as (Feedback & { employee: Employee | null })[];
  const newCount = feedback.filter((f) => f.status === "new").length;
  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
      : "—";
  const publicClicks = clicksData?.length ?? 0;
  const actionNeeded = feedback.filter((f) => f.status === "new" && f.rating < biz.star_threshold);
  const recentFeedback = feedback.slice(0, 8);

  const employeeMap = new Map<string, { name: string; role: string | null; ratings: number[] }>();
  for (const f of feedback) {
    if (f.employee) {
      const e = employeeMap.get(f.employee.id) ?? { name: f.employee.name, role: f.employee.role, ratings: [] };
      e.ratings.push(f.rating);
      employeeMap.set(f.employee.id, e);
    }
  }
  const leaderboard = [...employeeMap.entries()]
    .map(([id, e]) => ({
      id,
      name: e.name,
      role: e.role,
      avg: e.ratings.reduce((a, b) => a + b, 0) / e.ratings.length,
      count: e.ratings.length,
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 5);

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink tracking-tight">Dashboard</h1>
        <p className="text-sm text-ink-60 mt-0.5">
          {biz.name} ·{" "}
          <a
            href={`/r/${biz.slug}`}
            target="_blank"
            className="text-accent hover:underline font-mono text-xs"
          >
            /r/{biz.slug}
          </a>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: "Avg rating", value: avgRating, sub: "all time", accent: true },
          { label: "Total feedback", value: String(feedback.length), sub: "collected" },
          { label: "Public clicks", value: String(publicClicks), sub: "review redirects" },
          { label: "Action needed", value: String(newCount), sub: "unread", danger: newCount > 0 },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-paper rounded-xl border border-ink-10 px-4 py-4"
            style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
          >
            <div className="text-xs font-medium text-ink-60 mb-1">{s.label}</div>
            <div
              className="text-3xl font-bold tracking-tight"
              style={{ color: s.danger ? "#e04e4e" : s.accent ? "#5a5af0" : "#0e1220" }}
            >
              {s.value}
            </div>
            <div className="text-xs text-ink-40 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Action needed */}
      {actionNeeded.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-ink flex items-center gap-2">
              Action needed
              <span className="bg-danger text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {actionNeeded.length}
              </span>
            </h2>
            <Link href="/feedback" className="text-xs text-accent hover:underline">View all →</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {actionNeeded.slice(0, 3).map((f) => (
              <Link
                key={f.id}
                href={`/feedback/${f.id}`}
                className="flex items-start gap-3 p-4 bg-paper rounded-xl border border-ink-10 hover:border-accent/30 transition-colors relative"
                style={{ borderLeft: `3px solid ${f.rating <= 2 ? "#e04e4e" : "#e8a033"}` }}
              >
                {f.status === "new" && (
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent" />
                )}
                <div className="mt-0.5">
                  {f.employee ? <Avatar seed={f.employee.name} size={30} /> : (
                    <div className="w-8 h-8 rounded-full bg-ink-10 flex items-center justify-center text-xs text-ink-60">?</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <StarRow rating={f.rating} />
                    {f.employee && <span className="text-xs font-semibold text-ink">{f.employee.name}</span>}
                    {f.categories.map((c) => (
                      <span key={c} className="text-xs bg-ink-05 text-ink-60 px-1.5 py-0.5 rounded">{c}</span>
                    ))}
                  </div>
                  {f.body && <p className="text-xs text-ink-80 leading-relaxed line-clamp-2">&ldquo;{f.body}&rdquo;</p>}
                  {f.contact_email && <div className="text-xs text-ink-60 mt-1 font-mono">{f.contact_email}</div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Recent feedback */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-ink">Recent feedback</h2>
            <Link href="/feedback" className="text-xs text-accent hover:underline">View all →</Link>
          </div>
          <div className="bg-paper rounded-xl border border-ink-10" style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}>
            {recentFeedback.length === 0 ? (
              <div className="py-10 text-center text-sm text-ink-40">
                No feedback yet.{" "}
                <Link href="/posters" className="text-accent hover:underline">Get your QR code →</Link>
              </div>
            ) : (
              recentFeedback.map((f, i) => (
                <Link
                  key={f.id}
                  href={`/feedback/${f.id}`}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-ink-05 transition-colors"
                  style={{ borderBottom: i < recentFeedback.length - 1 ? "1px solid #e9eaee" : "none" }}
                >
                  <div className="mt-0.5">
                    {f.employee ? <Avatar seed={f.employee.name} size={26} /> : (
                      <div className="w-6 h-6 rounded-full bg-ink-10 flex items-center justify-center text-xs text-ink-60">?</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <StarRow rating={f.rating} />
                      {f.employee && <span className="text-xs font-medium text-ink">{f.employee.name.split(" ")[0]}</span>}
                      <span className="text-xs text-ink-40 ml-auto">{new Date(f.created_at).toLocaleDateString()}</span>
                    </div>
                    {f.body && <p className="text-xs text-ink-80 leading-relaxed line-clamp-1">&ldquo;{f.body}&rdquo;</p>}
                    {f.categories.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {f.categories.slice(0, 3).map((c) => (
                          <span key={c} className="text-xs bg-ink-05 text-ink-60 px-1.5 py-0.5 rounded">{c}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="text-sm font-semibold text-ink mb-3">Team leaderboard</h2>
          <div className="bg-paper rounded-xl border border-ink-10 px-4 py-2" style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}>
            {leaderboard.length === 0 ? (
              <div className="py-8 text-center text-xs text-ink-40">
                No employee data yet.<br />
                <Link href="/team" className="text-accent hover:underline">Add team →</Link>
              </div>
            ) : (
              leaderboard.map((emp, i) => (
                <div
                  key={emp.id}
                  className="flex items-center gap-3 py-2.5"
                  style={{ borderBottom: i < leaderboard.length - 1 ? "1px solid #e9eaee" : "none" }}
                >
                  <span className="text-sm w-5 text-center">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</span>
                  <Avatar seed={emp.name} size={28} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink truncate">{emp.name}</div>
                    <div className="text-xs text-ink-40">{emp.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-ink">{emp.avg.toFixed(1)}★</div>
                    <div className="text-xs text-ink-40">{emp.count}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
            fill={i <= rating ? "#f5b700" : "#d5d7dd"} />
        </svg>
      ))}
    </div>
  );
}
