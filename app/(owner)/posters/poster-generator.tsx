"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/avatar";
import { YepMark } from "@/components/yep-mark";
import type { Employee } from "@/types";

interface Props {
  business: { id: string; name: string; slug: string };
  employees: Pick<Employee, "id" | "name" | "role" | "slug">[];
  siteUrl: string;
}

type PosterTarget = "business" | string; // string = employee id

const THEMES = [
  { id: "light", label: "Light", bg: "#ffffff", fg: "#0e1220", accent: "#5a5af0" },
  { id: "dark", label: "Dark", bg: "#0e1220", fg: "#ffffff", accent: "#5a5af0" },
  { id: "accent", label: "Indigo", bg: "#5a5af0", fg: "#ffffff", accent: "#ffffff" },
];

export function PosterGenerator({ business, employees, siteUrl }: Props) {
  const [selected, setSelected] = useState<PosterTarget>("business");
  const [theme, setTheme] = useState(THEMES[0]);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const emp = employees.find((e) => e.id === selected);
  const reviewUrl =
    selected === "business"
      ? `${siteUrl}/r/${business.slug}`
      : `${siteUrl}/r/${business.slug}/${emp?.slug}`;

  useEffect(() => {
    async function gen() {
      setGenerating(true);
      try {
        const res = await fetch(`/api/qr?url=${encodeURIComponent(reviewUrl)}`);
        const data = await res.json();
        setQrDataUrl(data.dataUrl);
      } catch {
        setQrDataUrl("");
      }
      setGenerating(false);
    }
    gen();
  }, [reviewUrl]);

  return (
    <div className="flex gap-8">
      {/* Controls */}
      <div className="w-72 flex-shrink-0">
        {/* Target picker */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2">For</div>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setSelected("business")}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all"
              style={{
                borderColor: selected === "business" ? "#5a5af0" : "#e9eaee",
                background: selected === "business" ? "#eeeefe" : "#fff",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "#0e1220" }}
              >
                {business.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-semibold text-ink">{business.name}</div>
                <div className="text-xs text-ink-40">Business page</div>
              </div>
            </button>
            {employees.map((e) => (
              <button
                key={e.id}
                onClick={() => setSelected(e.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl border-2 text-left transition-all"
                style={{
                  borderColor: selected === e.id ? "#5a5af0" : "#e9eaee",
                  background: selected === e.id ? "#eeeefe" : "#fff",
                }}
              >
                <Avatar seed={e.name} size={28} />
                <div>
                  <div className="text-xs font-semibold text-ink">{e.name}</div>
                  <div className="text-xs text-ink-40">{e.role}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme picker */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2">Style</div>
          <div className="flex gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t)}
                className="flex-1 py-2 rounded-xl border-2 text-xs font-medium transition-all"
                style={{
                  borderColor: theme.id === t.id ? "#5a5af0" : "#e9eaee",
                  background: t.bg,
                  color: t.fg,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* URL */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-ink-60 uppercase tracking-wide mb-2">Review URL</div>
          <div className="bg-ink-05 rounded-lg px-3 py-2 font-mono text-xs text-ink-60 break-all">
            {reviewUrl}
          </div>
        </div>

        {/* Print button */}
        <button
          onClick={() => window.print()}
          className="w-full btn-primary py-3 text-sm"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Poster preview */}
      <div className="flex-1 flex items-center justify-center">
        <PosterCard
          business={business}
          employee={emp ?? null}
          theme={theme}
          qrDataUrl={qrDataUrl}
          generating={generating}
        />
      </div>
    </div>
  );
}

function PosterCard({
  business,
  employee,
  theme,
  qrDataUrl,
  generating,
}: {
  business: { name: string };
  employee: { name: string; role: string | null } | null;
  theme: { bg: string; fg: string; accent: string };
  qrDataUrl: string;
  generating: boolean;
}) {
  return (
    <div
      className="w-64 rounded-2xl p-7 flex flex-col items-center text-center gap-5"
      style={{
        background: theme.bg,
        color: theme.fg,
        boxShadow: "0 12px 40px rgba(14,18,32,0.18)",
        aspectRatio: "2/3",
        justifyContent: "center",
      }}
    >
      {/* Business name */}
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-widest mb-1"
          style={{ color: theme.accent, opacity: 0.8 }}
        >
          {business.name}
        </div>
        {employee ? (
          <>
            <Avatar seed={employee.name} size={52} />
            <div className="text-xl font-bold mt-3 tracking-tight" style={{ color: theme.fg }}>
              How did {employee.name.split(" ")[0]} do?
            </div>
            {employee.role && (
              <div className="text-xs mt-1 opacity-60">{employee.role}</div>
            )}
          </>
        ) : (
          <div className="text-xl font-bold tracking-tight" style={{ color: theme.fg }}>
            How was your visit?
          </div>
        )}
      </div>

      {/* QR Code */}
      <div
        className="w-36 h-36 rounded-xl flex items-center justify-center"
        style={{ background: "#fff" }}
      >
        {generating ? (
          <div className="text-xs text-ink-40">Generating...</div>
        ) : qrDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={qrDataUrl} alt="QR Code" className="w-28 h-28" />
        ) : (
          <div className="text-xs text-ink-40">QR code</div>
        )}
      </div>

      <div className="text-xs opacity-60">Scan to leave a review</div>

      {/* Yep branding */}
      <div className="mt-auto">
        <YepMark size={14} color={theme.fg} dotColor={theme.accent} />
      </div>
    </div>
  );
}
