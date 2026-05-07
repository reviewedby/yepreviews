"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Business, Industry } from "@/types";

const INDUSTRIES: { id: Industry; label: string }[] = [
  { id: "restaurant", label: "Restaurant" },
  { id: "salon", label: "Salon" },
  { id: "service", label: "Service" },
  { id: "retail", label: "Retail" },
  { id: "other", label: "Other" },
];

export function SettingsForm({ business }: { business: Business }) {
  const router = useRouter();
  const [name, setName] = useState(business.name);
  const [industry, setIndustry] = useState(business.industry);
  const [threshold, setThreshold] = useState(business.star_threshold);
  const [googleUrl, setGoogleUrl] = useState(business.google_review_url ?? "");
  const [yelpUrl, setYelpUrl] = useState(business.yelp_url ?? "");
  const [facebookUrl, setFacebookUrl] = useState(business.facebook_url ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    await supabase.from("businesses").update({
      name,
      industry,
      star_threshold: threshold,
      google_review_url: googleUrl || null,
      yelp_url: yelpUrl || null,
      facebook_url: facebookUrl || null,
    }).eq("id", business.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  return (
    <form onSubmit={handleSave}>
      {/* Business info */}
      <div
        className="bg-paper border border-ink-10 rounded-xl p-5 mb-4"
        style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
      >
        <div className="text-sm font-semibold text-ink mb-4">Business info</div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">Business name</label>
          <input className="input-base" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">Industry</label>
          <select
            className="input-base"
            value={industry}
            onChange={(e) => setIndustry(e.target.value as Industry)}
          >
            {INDUSTRIES.map((i) => (
              <option key={i.id} value={i.id}>{i.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">
            Public review threshold
          </label>
          <div className="flex gap-2">
            {[3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setThreshold(n)}
                className="flex-1 py-2 rounded-xl border-2 text-sm font-medium transition-all"
                style={{
                  borderColor: threshold === n ? "#5a5af0" : "#e9eaee",
                  background: threshold === n ? "#eeeefe" : "#fff",
                  color: threshold === n ? "#5a5af0" : "#5b5f6e",
                }}
              >
                {n}+ stars
              </button>
            ))}
          </div>
          <p className="text-xs text-ink-40 mt-1.5">Ratings below this go to private feedback.</p>
        </div>
      </div>

      {/* Review platforms */}
      <div
        className="bg-paper border border-ink-10 rounded-xl p-5 mb-4"
        style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
      >
        <div className="text-sm font-semibold text-ink mb-4">Review platforms</div>

        <div className="mb-3">
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">Google Review URL <span className="text-accent">Required</span></label>
          <input
            type="url"
            className="input-base"
            placeholder="https://g.page/r/your-place/review"
            value={googleUrl}
            onChange={(e) => setGoogleUrl(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">Yelp URL</label>
          <input
            type="url"
            className="input-base"
            placeholder="https://www.yelp.com/biz/..."
            value={yelpUrl}
            onChange={(e) => setYelpUrl(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink-60 mb-1.5">Facebook URL</label>
          <input
            type="url"
            className="input-base"
            placeholder="https://www.facebook.com/.../reviews"
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="btn-primary px-6 py-3 disabled:opacity-60"
      >
        {saved ? "Saved!" : saving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
