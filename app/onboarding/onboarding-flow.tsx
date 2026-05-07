"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { YepMark } from "@/components/yep-mark";
import { Avatar } from "@/components/avatar";
import type { Industry } from "@/types";

type Step = "welcome" | "basics" | "threshold" | "platforms" | "team" | "finish";

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

interface OnboardingState {
  bizName: string;
  bizSub: string;
  industry: Industry | "";
  threshold: number;
  googleUrl: string;
  yelpUrl: string;
  facebookUrl: string;
  team: TeamMember[];
}

const BIZ_TYPES = [
  { id: "restaurant" as Industry, label: "Restaurant", emoji: "🍽" },
  { id: "salon" as Industry, label: "Salon", emoji: "💇" },
  { id: "service" as Industry, label: "Service", emoji: "🔧" },
  { id: "retail" as Industry, label: "Retail", emoji: "🛍" },
  { id: "other" as Industry, label: "Other", emoji: "🏢" },
];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("welcome");
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    bizName: "",
    bizSub: "",
    industry: "",
    threshold: 4,
    googleUrl: "",
    yelpUrl: "",
    facebookUrl: "",
    team: [],
  });

  function update(patch: Partial<OnboardingState>) {
    setState((s) => ({ ...s, ...patch }));
  }

  async function finish() {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const slug = slugify(state.bizName);
    const { data: biz, error } = await supabase
      .from("businesses")
      .insert({
        owner_id: user.id,
        slug,
        name: state.bizName,
        industry: state.industry as Industry,
        google_review_url: state.googleUrl || null,
        yelp_url: state.yelpUrl || null,
        facebook_url: state.facebookUrl || null,
        star_threshold: state.threshold,
        subscription_status: "active", // set active for now; webhook will confirm
      })
      .select("id")
      .single();

    if (!error && biz && state.team.length > 0) {
      await supabase.from("employees").insert(
        state.team.map((m) => ({
          business_id: biz.id,
          slug: slugify(m.name),
          name: m.name,
          role: m.role || "Team member",
        }))
      );
    }

    setSaving(false);
    router.push("/dashboard");
  }

  const STEPS: Step[] = ["welcome", "basics", "threshold", "platforms", "team", "finish"];

  function next() {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  }

  function back() {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  return (
    <div className="min-h-screen bg-paper-warm flex flex-col">
      {/* Nav */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-ink-10">
        <YepMark size={22} />
        {step !== "welcome" && step !== "finish" && (
          <div className="flex items-center gap-2">
            {["basics", "threshold", "platforms", "team"].map((s, i) => {
              const stepIdx = STEPS.indexOf(step) - 1;
              const done = i < stepIdx;
              const current = i === stepIdx;
              return (
                <div
                  key={s}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: done || current ? "#5a5af0" : "#d5d7dd", width: current ? 20 : 8 }}
                />
              );
            })}
          </div>
        )}
      </header>

      <div className="flex-1 flex items-center justify-center p-8">
        {step === "welcome" && <StepWelcome onNext={next} />}
        {step === "basics" && (
          <StepBasics state={state} update={update} onNext={next} onBack={back} />
        )}
        {step === "threshold" && (
          <StepThreshold state={state} update={update} onNext={next} onBack={back} />
        )}
        {step === "platforms" && (
          <StepPlatforms state={state} update={update} onNext={next} onBack={back} />
        )}
        {step === "team" && (
          <StepTeam state={state} update={update} onNext={next} onBack={back} />
        )}
        {step === "finish" && (
          <StepFinish state={state} onBack={back} onFinish={finish} saving={saving} />
        )}
      </div>
    </div>
  );
}

// ── Step: Welcome ────────────────────────────────────────

function StepWelcome({ onNext }: { onNext: () => void }) {
  return (
    <div className="max-w-lg w-full">
      <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        Welcome to Yep
      </div>
      <h1 className="text-4xl font-bold text-ink tracking-tightest leading-tight mb-3">
        Let&apos;s set up your review funnel.
      </h1>
      <p className="text-base text-ink-60 leading-relaxed mb-8">
        About 4 minutes. You&apos;ll have your first QR poster printable by the end.
      </p>

      <div className="bg-paper-warm border border-ink-10 rounded-xl p-5 mb-6 flex flex-col gap-3">
        {[
          ["01", "Tell us about your business"],
          ["02", "Set your star threshold"],
          ["03", "Pick where happy reviews go"],
          ["04", "Add your team (optional)"],
          ["05", "Print your first poster"],
        ].map(([n, l]) => (
          <div key={n} className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center text-xs font-bold font-mono">
              {n}
            </div>
            <div className="text-sm text-ink-80">{l}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="bg-ink text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-ink-80 transition-colors"
      >
        Let&apos;s go →
      </button>
    </div>
  );
}

// ── Step: Basics ──────────────────────────────────────────

function StepBasics({
  state,
  update,
  onNext,
  onBack,
}: {
  state: OnboardingState;
  update: (p: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = state.bizName.trim() && state.industry;

  return (
    <div className="max-w-lg w-full">
      <StepHeader eyebrow="Step 1 of 5" title="What's your business?" sub="We'll use this on the customer-facing page." />

      <div className="mb-5">
        <label className="block text-xs font-semibold text-ink-80 mb-2">Business name</label>
        <input
          className="input-base"
          value={state.bizName}
          onChange={(e) => update({ bizName: e.target.value })}
          placeholder="e.g. Kaya Sushi"
          autoFocus
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-ink-80 mb-2">Location (optional)</label>
        <input
          className="input-base"
          value={state.bizSub}
          onChange={(e) => update({ bizSub: e.target.value })}
          placeholder="e.g. Midtown"
        />
      </div>

      <div className="mb-8">
        <label className="block text-xs font-semibold text-ink-80 mb-2">Business type</label>
        <div className="grid grid-cols-5 gap-2">
          {BIZ_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => update({ industry: t.id })}
              className="py-3 px-2 text-center rounded-xl border-2 transition-all"
              style={{
                borderColor: state.industry === t.id ? "#5a5af0" : "#e9eaee",
                background: state.industry === t.id ? "#eeeefe" : "#fff",
              }}
            >
              <div className="text-2xl mb-1">{t.emoji}</div>
              <div className="text-xs font-medium text-ink">{t.label}</div>
            </button>
          ))}
        </div>
      </div>

      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={!canContinue} />
    </div>
  );
}

// ── Step: Threshold ───────────────────────────────────────

function StepThreshold({
  state,
  update,
  onNext,
  onBack,
}: {
  state: OnboardingState;
  update: (p: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="max-w-lg w-full">
      <StepHeader
        eyebrow="Step 2 of 5"
        title="When should we ask for a public review?"
        sub="Below this rating, customers go to a private feedback form that only you see."
      />

      <div className="flex flex-col gap-2.5 mb-8">
        {[5, 4, 3].map((n) => {
          const active = state.threshold === n;
          return (
            <button
              key={n}
              onClick={() => update({ threshold: n })}
              className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
              style={{
                borderColor: active ? "#5a5af0" : "#e9eaee",
                background: active ? "#eeeefe" : "#fff",
              }}
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24">
                    <path
                      d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                      fill={i >= n ? "#f5b700" : "#d5d7dd"}
                    />
                  </svg>
                ))}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink flex items-center gap-2">
                  {n === 5 ? "5 stars only" : `${n}+ stars`}
                  {n === 4 && (
                    <span className="text-xs font-bold text-accent bg-accent-soft px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-xs text-ink-60">
                  {n === 5 && "Strictest — only perfect reviews go public."}
                  {n === 4 && "Filters out 1–3★ into private feedback."}
                  {n === 3 && "Loosest — most reviews go public."}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <StepFooter onBack={onBack} onNext={onNext} />
    </div>
  );
}

// ── Step: Platforms ───────────────────────────────────────

function StepPlatforms({
  state,
  update,
  onNext,
  onBack,
}: {
  state: OnboardingState;
  update: (p: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const canContinue = state.googleUrl.trim().length > 0;

  return (
    <div className="max-w-lg w-full">
      <StepHeader
        eyebrow="Step 3 of 5"
        title="Where should happy reviews go?"
        sub="Customers with enough stars will be sent to these platforms. Google is required."
      />

      <div className="flex flex-col gap-3 mb-8">
        <PlatformInput
          label="Google Review URL"
          sublabel="Required"
          placeholder="https://g.page/r/your-place/review"
          value={state.googleUrl}
          onChange={(v) => update({ googleUrl: v })}
          required
        />
        <PlatformInput
          label="Yelp URL"
          sublabel="Optional"
          placeholder="https://www.yelp.com/biz/..."
          value={state.yelpUrl}
          onChange={(v) => update({ yelpUrl: v })}
        />
        <PlatformInput
          label="Facebook URL"
          sublabel="Optional"
          placeholder="https://www.facebook.com/.../reviews"
          value={state.facebookUrl}
          onChange={(v) => update({ facebookUrl: v })}
        />
      </div>

      <StepFooter onBack={onBack} onNext={onNext} nextDisabled={!canContinue} />
    </div>
  );
}

function PlatformInput({
  label,
  sublabel,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  sublabel: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-xs font-semibold text-ink-80">{label}</label>
        <span
          className="text-xs font-medium px-1.5 py-0.5 rounded-full"
          style={{
            background: required ? "#eeeefe" : "#f4f5f7",
            color: required ? "#5a5af0" : "#5b5f6e",
          }}
        >
          {sublabel}
        </span>
      </div>
      <input
        type="url"
        className="input-base"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// ── Step: Team ────────────────────────────────────────────

function StepTeam({
  state,
  update,
  onNext,
  onBack,
}: {
  state: OnboardingState;
  update: (p: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [draftName, setDraftName] = useState("");
  const [draftRole, setDraftRole] = useState("");

  function addMember() {
    if (!draftName.trim()) return;
    update({
      team: [
        ...state.team,
        { id: `m${Date.now()}`, name: draftName.trim(), role: draftRole.trim() || "Team member" },
      ],
    });
    setDraftName("");
    setDraftRole("");
  }

  function removeMember(id: string) {
    update({ team: state.team.filter((m) => m.id !== id) });
  }

  return (
    <div className="max-w-lg w-full">
      <StepHeader
        eyebrow="Step 4 of 5"
        title="Who's on your team?"
        sub="Each person gets their own QR poster. Optional — you can add them later."
      />

      <div className="flex gap-2 mb-4">
        <input
          className="input-base flex-[2]"
          placeholder="Full name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMember()}
        />
        <input
          className="input-base flex-1"
          placeholder="Role"
          value={draftRole}
          onChange={(e) => setDraftRole(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMember()}
        />
        <button
          onClick={addMember}
          className="px-4 py-2.5 bg-ink text-white font-semibold rounded-xl text-sm hover:bg-ink-80"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2 min-h-16 mb-8">
        {state.team.length === 0 ? (
          <div
            className="py-5 text-center text-xs text-ink-40 rounded-xl border-2 border-dashed border-ink-10"
          >
            No team members yet — that&apos;s fine, add them later.
          </div>
        ) : (
          state.team.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 px-3 py-2.5 bg-paper-warm border border-ink-10 rounded-xl"
            >
              <Avatar seed={m.name} size={28} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink">{m.name}</div>
                <div className="text-xs text-ink-60">{m.role}</div>
              </div>
              <button
                onClick={() => removeMember(m.id)}
                className="text-ink-40 hover:text-ink transition-colors text-lg leading-none px-1"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <StepFooter
        onBack={onBack}
        onNext={onNext}
        nextLabel={state.team.length === 0 ? "Skip" : "Continue"}
      />
    </div>
  );
}

// ── Step: Finish ──────────────────────────────────────────

function StepFinish({
  state,
  onBack,
  onFinish,
  saving,
}: {
  state: OnboardingState;
  onBack: () => void;
  onFinish: () => void;
  saving: boolean;
}) {
  const slug = slugify(state.bizName || "your-business");

  return (
    <div className="max-w-lg w-full">
      <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
        Step 5 of 5 · You&apos;re in 🎉
      </div>
      <h1 className="text-3xl font-bold text-ink tracking-tight leading-tight mb-2">
        Here&apos;s your setup summary.
      </h1>
      <p className="text-sm text-ink-60 leading-relaxed mb-6">
        Everything looks good. Head to your dashboard to start collecting feedback.
      </p>

      <div className="bg-paper-warm border border-ink-10 rounded-xl p-5 mb-6">
        <div className="flex flex-col gap-2.5">
          <SummaryRow label="Business" value={state.bizName || "—"} />
          <SummaryRow label="Industry" value={state.industry || "—"} />
          <SummaryRow label="Public threshold" value={`${state.threshold}+ stars`} />
          <SummaryRow
            label="Review platforms"
            value={[state.googleUrl && "Google", state.yelpUrl && "Yelp", state.facebookUrl && "Facebook"].filter(Boolean).join(", ") || "None"}
          />
          <SummaryRow label="Team members" value={state.team.length === 0 ? "None yet" : state.team.map((m) => m.name).join(", ")} />
          <SummaryRow
            label="Your review link"
            value={`yep.app/r/${slug}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-ghost">← Back</button>
        <button
          onClick={onFinish}
          disabled={saving}
          className="bg-ink text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-ink-80 disabled:opacity-60 transition-colors"
        >
          {saving ? "Setting up..." : "Go to dashboard →"}
        </button>
      </div>
    </div>
  );
}

// ── Shared ────────────────────────────────────────────────

function StepHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <>
      <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">{eyebrow}</div>
      <h1 className="text-3xl font-bold text-ink tracking-tight leading-tight mb-2">{title}</h1>
      <p className="text-sm text-ink-60 leading-relaxed mb-7">{sub}</p>
    </>
  );
}

function StepFooter({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "Continue",
}: {
  onBack: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <button onClick={onBack} className="btn-ghost">← Back</button>
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-ink text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-ink-80 disabled:opacity-60 transition-colors"
      >
        {nextLabel}
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-ink-10 last:border-0">
      <span className="text-xs text-ink-60">{label}</span>
      <span className="text-xs font-semibold text-ink">{value}</span>
    </div>
  );
}
