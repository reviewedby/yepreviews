# House rules for this codebase

## What this is
A Next.js 15 + Supabase + Stripe app called **Yep** — a review-management tool for local businesses. Read `SPEC.md` first; that's the source of truth for product decisions.

## Design — match the HTML mockups exactly

The `Yep *.html` files in this folder are not "inspiration." They are the canonical design. Match them pixel-for-pixel: same colors, type, spacing, border radii, shadows, copy.

- **`hifi/hifi-tokens.jsx`** is the design-token source. Port every value (ink colors, accent, semantic colors, radii, shadows, font stacks) to `tailwind.config.ts` under matching names. Do not invent new tokens.
- When implementing a screen, **open the matching HTML file first** and mirror the layout. Don't redesign.
- Keep the visual rhythm: warm-cool neutrals, indigo `#5a5af0` accent used sparingly, generous radii, very subtle shadows.

## Stack — don't substitute

- Next.js 15 App Router. **No Pages Router.**
- TypeScript strict mode.
- Tailwind CSS for all styling. **No CSS-in-JS, no styled-components.**
- Supabase for DB + auth (magic links only, no password auth).
- Stripe Checkout + customer portal. **No custom billing UI.** No free trial.
- Resend for transactional email.
- `qrcode` package for QR generation.

## Conventions

- **File naming:** `kebab-case.tsx` for components, `kebab-case.ts` for utils.
- **Component style:** function components, server components by default, `"use client"` only when needed (forms, interactive state).
- **Data fetching:** server components hit Supabase directly via the SSR client. Mutations go through server actions or `/api` route handlers.
- **No `any`.** No `// @ts-ignore`. If you need a type and don't have one, define it.
- **Error handling:** every API route returns `{ ok: true, data }` or `{ ok: false, error }` JSON. No throwing across the boundary.

## Customer-facing routes are public

`/r/[business]` and `/r/[business]/[employee]` must work for unauthenticated visitors. They render fast (server component, single DB read), have no client-side auth checks, and degrade gracefully if JS is disabled (the star buttons can be a `<form>` with hidden input + GET).

## Privacy

- Private feedback is **never** rendered on a public page. Never. Even an unguessable URL is too much.
- Customer email/phone fields on private feedback are **optional**. Make this obvious in the UI.
- We do not track customers across sessions. No analytics on customer-facing pages beyond first-party click logging to `review_clicks`.

## Performance budgets

- Customer review page: **first contentful paint < 1s on 4G**, total JS < 50kb gzipped, no third-party scripts on first load.
- Owner dashboard: under 200kb gzipped, lazy-load charts.

## Don't

- Don't add features not in `SPEC.md`. If a feature seems necessary, add it to `SPEC.md` first and ask.
- Don't redesign screens that already have an HTML mockup.
- Don't introduce a new dependency without good reason. Tailwind, Supabase client, Stripe SDK, Resend SDK, and `qrcode` are the basics. Anything else, ask.
- Don't add password auth. Magic link only.
- Don't wire a free trial. The price is $99/mo, paywalled at signup via Stripe Checkout.

## Tone of voice (for any user-facing copy)

Plain, confident, owner-to-owner. Short sentences. No marketing fluff, no emoji in product UI. Examples in `Yep Marketing Landing.html` and the customer flow screens — match that voice.

## When stuck

Read the relevant HTML mockup. The answer to "how should this look / behave" is almost always already in there.
