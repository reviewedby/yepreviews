"use client";

import { useState } from "react";
import type { BusinessPublic, Employee } from "@/types";
import { YepMark } from "@/components/yep-mark";
import { Avatar } from "@/components/avatar";

const PROMPTS = ["", "Oof, sorry to hear", "Not great", "Alright", "Pretty good!", "Amazing!"];

interface RatingScreenProps {
  business: BusinessPublic;
  employee: Employee | null;
  onStarSelect: (rating: number) => void;
}

export function RatingScreen({ business, employee, onStarSelect }: RatingScreenProps) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const active = hovered || selected;

  function handleStarClick(star: number) {
    setSelected(star);
    setTimeout(() => onStarSelect(star), 200);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <BrandBar business={business} />
        <YepMark size={16} color="#5b5f6e" />
      </div>

      {/* Employee hero or business title */}
      {employee ? (
        <div
          className="mx-5 mt-2 bg-paper rounded-2xl text-center relative overflow-hidden"
          style={{
            padding: "22px 20px 18px",
            boxShadow: "0 4px 12px rgba(14,18,32,0.08), 0 1px 3px rgba(14,18,32,0.04)",
          }}
        >
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-60"
            style={{ background: "#eeeefe" }}
          />
          <div className="relative">
            <div className="flex justify-center mb-3.5">
              <Avatar seed={employee.name} size={72} ring />
            </div>
            <div className="text-xs font-semibold uppercase tracking-wide text-accent mb-1" style={{ letterSpacing: "0.06em" }}>
              You were helped by
            </div>
            <div className="text-2xl font-bold text-ink tracking-tight leading-tight mb-1">
              {employee.name}
            </div>
            {employee.role && (
              <div className="text-sm text-ink-60">{employee.role}</div>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-5 mt-2 py-7 text-center">
          <div className="text-2xl font-bold text-ink tracking-tight leading-snug">
            How was {business.name}?
          </div>
        </div>
      )}

      {/* Question */}
      <div className="px-5 pt-7 pb-3 text-center">
        <div className="text-xl font-bold text-ink tracking-tight leading-snug mb-1">
          {employee
            ? `How did ${employee.name.split(" ")[0]} do?`
            : "How was your visit?"}
        </div>
        <div className="text-sm text-ink-60 leading-relaxed" style={{ minHeight: 18 }}>
          {active ? PROMPTS[active] : "Tap a star to get started"}
        </div>
      </div>

      {/* Stars */}
      <div className="flex justify-center gap-1.5 px-5">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= active;
          return (
            <button
              key={i}
              onClick={() => handleStarClick(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              className="p-1 transition-transform"
              style={{ transform: filled ? "scale(1.05)" : "scale(0.97)" }}
              aria-label={`${i} star${i !== 1 ? "s" : ""}`}
            >
              <svg width="44" height="44" viewBox="0 0 24 24">
                <path
                  d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z"
                  fill={filled ? "#f5b700" : "transparent"}
                  stroke={filled ? "#f5b700" : "#d5d7dd"}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>

      <div className="flex-1" />
      <div className="px-5 pb-6">
        <PoweredBy />
      </div>
    </div>
  );
}

function BrandBar({ business }: { business: BusinessPublic }) {
  const initial = business.name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
        style={{ background: "#0e1220" }}
      >
        {initial}
      </div>
      <div>
        <div className="font-semibold text-sm text-ink leading-tight">{business.name}</div>
        <div className="text-xs text-ink-40 capitalize">{business.industry}</div>
      </div>
    </div>
  );
}

function PoweredBy() {
  return (
    <div className="flex items-center justify-center gap-1 text-ink-40" style={{ fontSize: 10, letterSpacing: "0.03em", fontWeight: 500 }}>
      <span>powered by</span>
      <YepMark size={12} color="#5b5f6e" />
    </div>
  );
}

export { BrandBar, PoweredBy };
