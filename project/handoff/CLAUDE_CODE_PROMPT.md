# Starting prompt for Claude Code

Copy-paste this into Claude Code as your first message after pointing it at this folder:

---

I'm building **Yep**, a review-management tool for local businesses. Everything you need is in this folder.

**Read these first, in order:**
1. `CLAUDE.md` — house rules
2. `SPEC.md` — full product spec, data model, routes, build order
3. `hifi/hifi-tokens.jsx` — design tokens (the source of truth for colors, type, spacing)
4. `Yep Classic Hi-Fi.html` — the customer review flow
5. `Yep Owner Dashboard.html` — the owner dashboard
6. `Yep Business Onboarding.html` — onboarding
7. `Yep QR Posters.html` — poster generator
8. `Yep Marketing Landing.html` — marketing site

**Then start with step 1 of the build order in SPEC.md:** scaffold a fresh Next.js 15 + TypeScript + Tailwind project, set up the Supabase client, copy `handoff/tailwind.config.ts` into the project root (tokens are already ported), run `handoff/supabase-schema.sql` in the Supabase SQL editor, and stub out the route structure listed in SPEC.md (empty pages are fine).

Show me the directory tree and the `tailwind.config.ts` when you're done with step 1, and we'll go from there.

**Important constraints:**
- Match the HTML mockups pixel-for-pixel. They are the design, not inspiration.
- Stack is locked: Next.js 15 App Router, Supabase, Stripe, Resend, Vercel. Don't substitute.
- No free trial. $99/mo paywall via Stripe Checkout at signup.
- Magic-link auth only. No passwords.
