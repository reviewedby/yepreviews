"use client";

import { useState } from "react";
import type { BusinessPublic, Employee } from "@/types";
import { YepMark } from "@/components/yep-mark";
import { BrandBar, PoweredBy } from "./rating-screen";

const CATEGORY_SETS: Record<string, string[]> = {
  restaurant: ["Food", "Service", "Wait time", "Cleanliness", "Noise", "Value", "Atmosphere", "Other"],
  salon: ["Service", "Wait time", "Cleanliness", "Value", "Communication", "Atmosphere", "Other"],
  service: ["Service quality", "Wait time", "Communication", "Value", "Professionalism", "Other"],
  retail: ["Product quality", "Service", "Wait time", "Cleanliness", "Value", "Selection", "Other"],
  other: ["Service", "Wait time", "Cleanliness", "Value", "Communication", "Atmosphere", "Other"],
};

interface NegativeScreenProps {
  business: BusinessPublic;
  employee: Employee | null;
  rating: number;
  onSubmit: () => void;
}

export function NegativeScreen({ business, employee, rating, onSubmit }: NegativeScreenProps) {
  const chips = CATEGORY_SETS[business.industry] ?? CATEGORY_SETS.other;
  const [selected, setSelected] = useState<string[]>([]);
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function toggleChip(chip: string) {
    setSelected((s) =>
      s.includes(chip) ? s.filter((c) => c !== chip) : [...s, chip]
    );
  }

  async function handleSubmit() {
    setSubmitting(true);
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_id: business.id,
        employee_id: employee?.id ?? null,
        rating,
        categories: selected,
        body: body || null,
        contact_email: email || null,
        contact_phone: phone || null,
      }),
    });
    setSubmitting(false);
    onSubmit();
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <BrandBar business={business} />
        <YepMark size={16} color="#5b5f6e" />
      </div>

      <div className="px-5 flex-1 overflow-auto pb-4">
        <div className="text-2xl font-bold text-ink tracking-tight leading-snug mb-1.5">
          We want to make it right.
        </div>
        <div className="text-sm text-ink-60 leading-relaxed mb-5">
          Tell us what went wrong so we can fix it. This goes straight to the team.
        </div>

        {/* Categories */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2" style={{ letterSpacing: "0.05em" }}>
            What specifically?
          </div>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((chip) => {
              const on = selected.includes(chip);
              return (
                <button
                  key={chip}
                  onClick={() => toggleChip(chip)}
                  className="inline-flex items-center gap-1 text-xs font-medium rounded-full px-3 py-1.5 transition-all"
                  style={{
                    border: `1.5px solid ${on ? "#5a5af0" : "#d5d7dd"}`,
                    background: on ? "#eeeefe" : "#fff",
                    color: on ? "#5a5af0" : "#2a2e3d",
                  }}
                >
                  {on && <span>✓</span>}
                  {chip}
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us more (optional)..."
          rows={3}
          className="w-full px-3 py-3 text-sm text-ink rounded-xl border border-ink-10 focus:outline-none focus:border-accent focus:ring-2 resize-none leading-relaxed placeholder:text-ink-40 mb-3"
          style={{ background: "#fff" }}
        />

        {/* Contact optional */}
        {!showContact ? (
          <button
            onClick={() => setShowContact(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-medium text-ink-60 border border-dashed border-ink-20 rounded-xl mb-2 hover:border-ink-40 transition-colors"
          >
            <MailIcon /> Leave contact info (optional)
          </button>
        ) : (
          <div className="flex gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional)"
              className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-ink-10 focus:outline-none focus:border-accent focus:ring-2 placeholder:text-ink-40"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (optional)"
              className="flex-1 px-3 py-2.5 text-xs rounded-xl border border-ink-10 focus:outline-none focus:border-accent focus:ring-2 placeholder:text-ink-40"
            />
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-2">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full py-4 bg-ink text-white font-semibold rounded-full text-base transition-opacity disabled:opacity-60"
          style={{ boxShadow: "0 4px 12px rgba(14,18,32,0.18)" }}
        >
          {submitting ? "Sending..." : "Send feedback"}
        </button>
        <div className="mt-3">
          <PoweredBy />
        </div>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
