"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { YepMark } from "@/components/yep-mark";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink-05 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <YepMark size={32} />
          <p className="mt-2 text-sm text-ink-60">Business owner portal</p>
        </div>

        <div className="bg-paper rounded-2xl p-8" style={{ boxShadow: "0 4px 12px rgba(14,18,32,0.08)" }}>
          {sent ? (
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "#e3f6ee" }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#12a66a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-ink mb-2">Check your email</h1>
              <p className="text-sm text-ink-60 leading-relaxed">
                We sent a magic link to <strong className="text-ink">{email}</strong>.
                Click it to sign in — no password needed.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-sm text-accent hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-ink mb-1.5">Sign in</h1>
              <p className="text-sm text-ink-60 mb-6">
                We&apos;ll send a magic link to your email — no password needed.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="input-base"
                  autoFocus
                />

                {error && (
                  <p className="text-sm text-danger">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send magic link"}
                </button>
              </form>

              <p className="mt-6 text-xs text-ink-40 text-center">
                Don&apos;t have an account?{" "}
                <a href="/api/stripe/checkout" className="text-accent hover:underline">
                  Get started for $99/mo
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
