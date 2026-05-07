"use client";

import type { BusinessPublic, Employee } from "@/types";
import { YepMark } from "@/components/yep-mark";
import { Avatar } from "@/components/avatar";
import { BrandBar, PoweredBy } from "./rating-screen";

interface PositiveScreenProps {
  business: BusinessPublic;
  employee: Employee | null;
  rating: number;
  onPlatformClick: () => void;
}

export function PositiveScreen({ business, employee, rating, onPlatformClick }: PositiveScreenProps) {
  const firstName = employee?.name.split(" ")[0] ?? null;

  async function handlePlatformClick(platform: "google" | "yelp" | "facebook", url: string) {
    await fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        business_id: business.id,
        employee_id: employee?.id ?? null,
        rating,
        platform,
      }),
    });
    window.open(url, "_blank");
    onPlatformClick();
  }

  const allPlatforms: Array<{
    id: "google" | "yelp" | "facebook";
    name: string;
    url: string | null;
    primary?: boolean;
  }> = [
    { id: "google", name: "Google", url: business.google_review_url, primary: true },
    { id: "yelp", name: "Yelp", url: business.yelp_url },
    { id: "facebook", name: "Facebook", url: business.facebook_url },
  ];
  const platforms = allPlatforms.filter((p): p is typeof p & { url: string } => p.url !== null);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <BrandBar business={business} />
        <YepMark size={16} color="#5b5f6e" />
      </div>

      {/* Celebration header */}
      <div className="px-5 pt-3 pb-0 text-center">
        <div className="inline-flex items-center gap-1.5 bg-good-soft text-good px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          style={{ color: "#0a7a4e" }}>
          🎉 Thanks for the {rating} stars
        </div>
        <div className="text-2xl font-bold text-ink tracking-tight leading-snug mb-2">
          Share it where it counts?
        </div>
        <div className="text-sm text-ink-60 leading-relaxed mx-auto" style={{ maxWidth: 300 }}>
          {firstName
            ? <>It takes 20 seconds and means the world to {firstName}.</>
            : <>It takes 20 seconds and means the world to {business.name}.</>}
        </div>
      </div>

      {/* Employee mention callout */}
      {employee && firstName && (
        <div className="mx-5 mt-5">
          <div
            className="flex items-center gap-3 rounded-xl p-3.5"
            style={{
              background: "#eeeefe",
              border: "1.5px solid rgba(90,90,240,0.13)",
            }}
          >
            <Avatar seed={employee.name} size={40} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink leading-snug">Quick favor?</div>
              <div className="text-xs text-ink-60 leading-snug">
                Please mention <strong className="text-accent">{firstName}</strong> by name — it helps them a ton.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform buttons */}
      <div className="px-5 mt-5 flex-1">
        {platforms.length === 0 && (
          <div className="text-center text-ink-40 text-sm py-8">
            No review platforms configured yet.
          </div>
        )}
        {platforms.map((p, idx) =>
          idx === 0 ? (
            <button
              key={p.id}
              onClick={() => handlePlatformClick(p.id, p.url!)}
              className="w-full flex items-center gap-3.5 p-4 bg-paper rounded-xl mb-2.5 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{
                border: "2px solid #5a5af0",
                boxShadow: "0 4px 12px rgba(90,90,240,0.13)",
              }}
            >
              <PlatformLogo id={p.id} size={44} />
              <div className="flex-1">
                <div className="text-base font-semibold text-ink">Review on {p.name}</div>
                <div className="text-xs font-medium text-accent">Recommended · most visibility</div>
              </div>
              <ArrowIcon />
            </button>
          ) : (
            <button
              key={p.id}
              onClick={() => handlePlatformClick(p.id, p.url!)}
              className="w-full flex items-center gap-3.5 p-3 bg-paper rounded-xl mb-2 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{ border: "1px solid #e9eaee" }}
            >
              <PlatformLogo id={p.id} size={36} />
              <div className="flex-1 text-sm font-medium text-ink">{p.name}</div>
              <ExternalIcon />
            </button>
          )
        )}
      </div>

      <div className="px-5 pb-6 pt-3">
        <PoweredBy />
      </div>
    </div>
  );
}

function PlatformLogo({ id, size }: { id: string; size: number }) {
  const inner: Record<string, React.ReactNode> = {
    google: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22 12.1c0-.8-.1-1.4-.2-2.1H12v4h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z" />
        <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 19.7 7.9 22 12 22z" />
        <path fill="#FBBC04" d="M6.2 13.6c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7H2.7C2 8.4 1.6 10.1 1.6 12s.4 3.6 1.1 5l3.5-2.7z" />
        <path fill="#EA4335" d="M12 5.8c1.5 0 2.9.5 4 1.5l3-3C17.1 2.5 14.7 1.6 12 1.6 7.9 1.6 4.4 3.9 2.7 7l3.5 2.7c.8-2.5 3.1-4.3 5.8-4.3z" />
      </svg>
    ),
    yelp: (
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: 17, fontWeight: 900, color: "#D32323" }}>
        yelp
      </span>
    ),
    facebook: (
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 4,
          background: "#1877F2",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: 15,
          fontWeight: 800,
        }}
      >
        f
      </div>
    ),
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 1px 2px rgba(14,18,32,0.06)",
        flexShrink: 0,
        border: "1px solid #e9eaee",
      }}
    >
      {inner[id]}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5a5af0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9094a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l10-10" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
