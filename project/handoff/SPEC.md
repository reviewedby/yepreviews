# Yep — Product Spec

## What it is
A review-management tool for local businesses. One QR code, two paths:
- **Happy customers (4–5★)** are routed to public review platforms (Google, Yelp, Facebook).
- **Unhappy customers (1–3★)** are routed to a private feedback form that emails the owner — never goes public.

Tagline: **"Catch the bad. Show the good."**

Goal: a customer can leave a review in **under 20 seconds**.

## Users
1. **Business owner** — pays $99/mo, signs up, configures their business, prints QR posters, reads private feedback in their inbox.
2. **Customer** — scans a QR code, taps a star, posts publicly OR leaves private feedback. Never logs in. Never installs anything.
3. **Employee (v1.5, optional)** — has their own QR. Reviews mention them by name. Feedback is tagged to them on the owner's dashboard.

## Tech stack
- **Frontend / backend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Database / auth:** Supabase (Postgres + Row-Level Security + magic-link auth)
- **Payments:** Stripe (Checkout + customer portal, $99/mo subscription)
- **Email:** Resend (private-feedback notifications, magic-link delivery)
- **Hosting:** Vercel
- **QR generation:** `qrcode` npm package (server-side, return as data URL or PNG)

## Data model

```sql
-- businesses
id              uuid pk
owner_id        uuid (auth.users)
slug            text unique          -- yep.app/r/kaya-sushi
name            text
industry        text                 -- 'restaurant' | 'salon' | 'service' | 'retail'
google_review_url text                -- the writereview?placeid=... URL
yelp_url        text nullable
facebook_url    text nullable
star_threshold  int default 4         -- ≥ this goes public, < goes private
stripe_customer_id text
subscription_status text              -- 'trialing' | 'active' | 'past_due' | 'canceled'
created_at      timestamptz

-- employees (v1.5)
id              uuid pk
business_id     uuid fk
slug            text                 -- yep.app/r/kaya-sushi/aiko
name            text
photo_url       text nullable
role            text nullable
active          bool default true
created_at      timestamptz

-- feedback (private only — public reviews go straight to Google)
id              uuid pk
business_id     uuid fk
employee_id     uuid fk nullable
rating          int (1-5)
categories      text[]               -- ['Wait time', 'Service', ...]
body            text nullable
contact_email   text nullable
contact_phone   text nullable
status          text default 'new'   -- 'new' | 'read' | 'followed_up'
owner_notes     text nullable
created_at      timestamptz

-- review_clicks (tracking — fired when someone clicks Post to Google etc)
id              uuid pk
business_id     uuid fk
employee_id     uuid fk nullable
rating          int
platform        text                 -- 'google' | 'yelp' | 'facebook'
created_at      timestamptz
```

RLS rules:
- `feedback`: owner can SELECT/UPDATE rows where `business_id` belongs to them.
- `feedback` INSERT: public (no auth needed — anyone with the link can submit).
- `businesses`, `employees`: owner read/write own rows; public read of `slug`, `name`, `industry`, `google_review_url`, `yelp_url`, `facebook_url`, `star_threshold` (needed by the customer page).

## Routes

### Public (customer-facing)
- `GET /r/[business]` — review landing for a business
- `GET /r/[business]/[employee]` — review landing scoped to an employee
- `POST /api/feedback` — submit private feedback (rate-limit: 3 per IP per hour)
- `POST /api/click` — log a "post to platform" click

### Owner (auth required)
- `/login` — magic-link form
- `/auth/callback` — Supabase auth handler
- `/onboarding` — multi-step setup (basics → threshold → platform URLs → team → finish)
- `/dashboard` — overview: stats, recent feedback, action-needed inbox
- `/feedback` — full inbox, filterable
- `/feedback/[id]` — single thread, mark read/followed-up, owner notes
- `/team` — manage employees
- `/posters` — QR poster generator + print
- `/settings` — business info, threshold, platform URLs, billing portal link

### Marketing
- `/` — marketing landing
- `/pricing`
- `/privacy`, `/terms`

### Stripe
- `/api/stripe/checkout` — create Checkout Session
- `/api/stripe/webhook` — handle subscription state changes
- `/api/stripe/portal` — redirect to customer portal

## Customer flow (under 20s target)

1. Scan QR → land on `/r/[business]` (or `/r/[business]/[employee]`)
2. See business name + "How was your visit?" + 5 star buttons
3. Tap a star (state stored in URL hash so back-button works)
4. **If rating ≥ threshold:** show platform buttons (Google primary, others below). Tap → opens platform's review page in a new tab. Log click to `review_clicks`. Show "Thanks!" toast.
5. **If rating < threshold:** show private form. Category chips (Wait time, Service, Food, Cleanliness, Value, Atmosphere — configurable per industry), optional textarea, optional contact (email/phone). Submit → POST `/api/feedback` → email owner via Resend → show "Thank you, we'll be in touch" screen.

## Owner flow

1. **Sign up:** marketing landing → "Get started" → email magic link → Stripe Checkout for $99/mo → webhook flips `subscription_status` to `active` → land in onboarding.
2. **Onboarding (5 steps):** basics (business name, industry) → star threshold → platform URLs (Google required, others optional) → team (optional, can add later) → finish (download first poster).
3. **Daily use:** open dashboard → see new feedback badge → click into inbox → read note → optionally email customer back → mark followed-up.
4. **Print posters:** `/posters` → pick template → pick employee (or "no employee") → download PDF.

## Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_ID=                    # $99/mo recurring
RESEND_API_KEY=
RESEND_FROM_EMAIL=                  # e.g. notify@yep.app
NEXT_PUBLIC_SITE_URL=               # e.g. https://yep.app
```

## Pricing
- **$99 / month per location**
- No free trial
- Month-to-month, cancel anytime via Stripe customer portal
- No setup fees, no credit-card-required signup — Stripe Checkout is the gate

## Build order (recommended)
1. **Scaffold** — Next.js + Tailwind + Supabase client + design tokens from `hifi/hifi-tokens.jsx`
2. **Customer review page** (no auth, no DB writes yet — just route it)
3. **Supabase schema + RLS** — run the SQL above
4. **Wire customer page** — fetch business by slug, POST feedback, log clicks
5. **Resend email** — when feedback lands, email the owner
6. **Owner auth** — magic link login
7. **Onboarding** — 5 steps, write to `businesses` table
8. **Stripe Checkout + webhook** — gate dashboard access on `subscription_status = 'active'`
9. **Owner dashboard + inbox** — list feedback, detail page, mark read/followed-up
10. **QR poster generator** — render with `qrcode` package + the templates from `posters/poster-templates.jsx`
11. **Marketing landing** — copy from `Yep Marketing Landing.html`
12. **Deploy to Vercel + connect domain**

## Design references
Match these HTML files pixel-for-pixel — same colors, type, spacing, shadows, border radii:
- `Yep Classic Hi-Fi.html` — customer review flow (every screen)
- `Yep Owner Dashboard.html` — dashboard layout
- `Yep Business Onboarding.html` — onboarding steps
- `Yep QR Posters.html` — poster templates
- `Yep Marketing Landing.html` — marketing site
- `hifi/hifi-tokens.jsx` — **the source of truth for colors, type, spacing.** Port these to Tailwind config.

Design language summary:
- **Inks:** `#0e1220` (primary), warm-cool neutrals stepping down to `#f4f5f7`
- **Accent:** `#5a5af0` (indigo) with `#eeeefe` soft and `#3e3ec8` dark
- **Semantic:** good `#12a66a`, warn `#e8a033`, danger `#e04e4e`, gold `#f5b700`
- **Type:** Inter (UI), JetBrains Mono (numbers/labels)
- **Radii:** 8 / 12 / 16 / 20 — generous but not cartoonish
- **Shadows:** `0 1px 3px rgba(14,18,32,0.04)` for cards; heavier only for floating elements

## Out of scope for v1
- Multi-location per owner (single business per account)
- SMS notifications
- Public review-platform integrations beyond Google/Yelp/Facebook deep links
- AI summaries of feedback
- Team roles / multiple seats per business
- Webhooks / Zapier
- Mobile app (mobile web is the design target)
