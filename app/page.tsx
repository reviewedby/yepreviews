import Link from "next/link";
import { YepMark } from "@/components/yep-mark";

const STATS = [
  { value: "84%", label: "of unhappy customers who leave quietly would have told you — if you asked right" },
  { value: "3.2×", label: "more issues surfaced vs. public review sites alone" },
  { value: "11 days", label: "avg time from first signal to shipped fix" },
  { value: "+1.2★", label: "rating lift in 60 days — because the business got better" },
];

const STEPS = [
  {
    n: "01",
    title: "Catch the moment — privately",
    desc: "Customer scans your QR, taps a star. Low rating? They land on a private form — not a public review page. Straight to your inbox. Nothing goes public unless they choose.",
  },
  {
    n: "02",
    title: "Understand the pattern",
    desc: "One complaint is noise. Twelve complaints about \"wait time on Fridays\" is a strategy meeting. Yep groups feedback by theme, employee, and week — so you see what to fix.",
  },
  {
    n: "03",
    title: "Ship the fix — and watch it work",
    desc: "Change the schedule, retrain the tech, fix the menu. Yep tracks whether that category stops showing up. You're running a feedback loop, not managing reviews.",
  },
];

const TESTIMONIALS = [
  {
    name: "Elena García",
    role: "Owner · Casa Elena",
    color: "#e85a5a",
    quote:
      "I used to find out about a bad night on Google at 11pm. Now I read it in a private note at 9pm and call the table by 9:15. Different business.",
  },
  {
    name: "Dev Patel",
    role: "GM · Lotus Salon Group (4 locations)",
    color: "#7a52d4",
    quote:
      "Yep isn't a review tool for us — it's a management tool. Every Monday I read the week's private feedback before I walk the floor.",
  },
  {
    name: "Marcus Reid",
    role: "Owner · Ridge HVAC",
    color: "#2ca39a",
    quote:
      "One chip — 'communication' — kept coming up for one tech. Invisible on Google. Glaring on Yep. One training conversation later, it stopped.",
  },
];

const FAQ = [
  {
    q: "Isn't this just hiding bad reviews?",
    a: "No. Customers can still post anywhere they want — we never block them. We just ask privately first, because most unhappy customers would rather vent to you than to the internet.",
  },
  {
    q: "Does this work with Google?",
    a: "Yep. Google is our #1 destination for happy customers. Your posted reviews show up on your Business Profile like any other.",
  },
  {
    q: "What if I have multiple locations?",
    a: "Each location gets its own QR, inbox, and insights — so you can see whose problems are whose.",
  },
  {
    q: "Do I need to install anything?",
    a: "Nope. Print a QR. You're live.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-paper font-sans">
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-ink-10 bg-paper/90 backdrop-blur-sm"
      >
        <YepMark size={22} />
        <div className="flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-ink-60 hover:text-ink transition-colors hidden sm:block">
            How it works
          </a>
          <a href="#pricing" className="text-sm text-ink-60 hover:text-ink transition-colors hidden sm:block">
            Pricing
          </a>
          <Link href="/login" className="text-sm text-ink-60 hover:text-ink transition-colors">
            Sign in
          </Link>
          <a
            href="/api/stripe/checkout"
            className="btn-primary py-2 px-4 text-sm"
          >
            Get started
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-8 py-20 max-w-5xl mx-auto text-center">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border"
          style={{ background: "#eeeefe", color: "#5a5af0", borderColor: "rgba(90,90,240,0.2)" }}
        >
          Catch the bad · show the good
        </div>

        <h1
          className="font-bold text-ink mb-6 leading-tight"
          style={{ fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.04em" }}
        >
          Catch the bad.
          <br />
          <span style={{ color: "#5a5af0" }}>Show</span> the good.
        </h1>

        <p className="text-lg text-ink-60 leading-relaxed max-w-xl mx-auto mb-8">
          One QR code, two paths. Unhappy customers land in a private inbox where you can fix it.
          Happy ones go to Google, Yelp, and Facebook where it counts.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="/api/stripe/checkout"
            className="btn-primary py-3.5 px-8 text-base"
          >
            Get started — $99/mo
          </a>
          <a href="#how-it-works" className="btn-secondary py-3.5 px-6 text-base">
            See how it works
          </a>
        </div>

        <p className="text-xs text-ink-40 mt-4">No free trial · Cancel anytime</p>
      </section>

      {/* Social proof logos */}
      <section className="py-8 border-y border-ink-10 bg-ink-05">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-xs text-ink-40 text-center mb-4 font-medium uppercase tracking-wide">
            Trusted by local businesses
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-ink-40">
            {["Casa Elena", "Lotus Salons", "Ridge HVAC", "Kaya Sushi", "North & Pine", "Blue Fox Café", "Thread & Bloom", "Bright Dental"].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">How it works</div>
          <h2
            className="font-bold text-ink tracking-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.035em" }}
          >
            Catch → Understand → Fix
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="bg-paper border border-ink-10 rounded-2xl p-6"
              style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
            >
              <div
                className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center font-mono text-xs font-bold mb-4"
              >
                {step.n}
              </div>
              <h3 className="text-base font-bold text-ink mb-2 tracking-tight">{step.title}</h3>
              <p className="text-sm text-ink-60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-ink">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.value} className="text-center">
                <div
                  className="font-bold mb-1.5"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#5a5af0", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-paper/60 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className="font-bold text-ink tracking-tight"
            style={{ fontSize: "clamp(26px, 3.5vw, 40px)", letterSpacing: "-0.03em" }}
          >
            What owners say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-paper border border-ink-10 rounded-2xl p-6"
              style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
            >
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24">
                    <path d="M12 2l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8L12 17l-6.1 3.5 1.5-6.8L2.2 9l6.9-.7L12 2z" fill="#f5b700" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-ink-80 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: t.color }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-ink-40">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-8">
        <div className="max-w-sm mx-auto text-center">
          <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Pricing</div>
          <h2
            className="font-bold text-ink tracking-tight mb-8"
            style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.035em" }}
          >
            One price. No surprises.
          </h2>

          <div
            className="bg-paper border-2 border-ink rounded-2xl p-8"
            style={{ boxShadow: "0 12px 40px rgba(14,18,32,0.12)" }}
          >
            <div className="text-5xl font-bold text-ink tracking-tight mb-1">$99</div>
            <div className="text-sm text-ink-60 mb-6">per location / month</div>

            <ul className="text-sm text-ink-80 text-left space-y-2.5 mb-8">
              {[
                "Unlimited QR scans",
                "Private feedback inbox",
                "Google, Yelp & Facebook routing",
                "Employee-level QR codes",
                "Team leaderboard",
                "Email notifications",
                "QR poster generator",
                "Cancel anytime",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#12a66a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="/api/stripe/checkout"
              className="btn-primary w-full py-4 text-base block text-center"
            >
              Get started
            </a>
            <p className="text-xs text-ink-40 mt-3">No free trial · Month-to-month · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-8 max-w-2xl mx-auto">
        <h2 className="text-xl font-bold text-ink text-center mb-8 tracking-tight">Questions</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="bg-paper border border-ink-10 rounded-xl px-5 py-4"
              style={{ boxShadow: "0 1px 3px rgba(14,18,32,0.04)" }}
            >
              <div className="text-sm font-semibold text-ink mb-1.5">{item.q}</div>
              <div className="text-sm text-ink-60 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-8 bg-ink text-center">
        <h2
          className="font-bold text-white mb-4 tracking-tight"
          style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-0.035em" }}
        >
          Stop finding out on Google.
        </h2>
        <p className="text-base text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
          Every complaint you catch privately is a Google review that doesn&apos;t exist.
          Every fix you ship is a rating that goes up.
        </p>
        <a
          href="/api/stripe/checkout"
          className="inline-block bg-white text-ink font-bold py-4 px-10 rounded-full text-base hover:bg-ink-05 transition-colors"
          style={{ boxShadow: "0 4px 20px rgba(255,255,255,0.15)" }}
        >
          Get started — $99/mo
        </a>
        <p className="text-xs text-white/30 mt-4">No free trial · Cancel anytime</p>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-ink-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <YepMark size={18} />
          <div className="flex gap-6 text-xs text-ink-40">
            <a href="/privacy" className="hover:text-ink transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-ink transition-colors">Terms</a>
            <Link href="/login" className="hover:text-ink transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
