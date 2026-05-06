-- Yep — initial schema
-- Run in Supabase SQL editor. Assumes auth.users exists (it does by default).

-- ── Tables ──────────────────────────────────────────────────────────────

create table public.businesses (
  id                  uuid primary key default gen_random_uuid(),
  owner_id            uuid not null references auth.users(id) on delete cascade,
  slug                text not null unique,
  name                text not null,
  industry            text not null check (industry in ('restaurant','salon','service','retail','other')),
  google_review_url   text,
  yelp_url            text,
  facebook_url        text,
  star_threshold      int  not null default 4 check (star_threshold between 2 and 5),
  stripe_customer_id  text,
  subscription_status text not null default 'incomplete'
                      check (subscription_status in ('incomplete','active','past_due','canceled')),
  created_at          timestamptz not null default now()
);
create index on public.businesses (owner_id);

create table public.employees (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  slug        text not null,
  name        text not null,
  photo_url   text,
  role        text,
  active      bool not null default true,
  created_at  timestamptz not null default now(),
  unique (business_id, slug)
);
create index on public.employees (business_id);

create table public.feedback (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references public.businesses(id) on delete cascade,
  employee_id   uuid references public.employees(id) on delete set null,
  rating        int  not null check (rating between 1 and 5),
  categories    text[] not null default '{}',
  body          text,
  contact_email text,
  contact_phone text,
  status        text not null default 'new'
                check (status in ('new','read','followed_up')),
  owner_notes   text,
  created_at    timestamptz not null default now()
);
create index on public.feedback (business_id, created_at desc);
create index on public.feedback (business_id, status);

create table public.review_clicks (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete set null,
  rating      int  not null check (rating between 1 and 5),
  platform    text not null check (platform in ('google','yelp','facebook')),
  created_at  timestamptz not null default now()
);
create index on public.review_clicks (business_id, created_at desc);

-- ── RLS ─────────────────────────────────────────────────────────────────

alter table public.businesses    enable row level security;
alter table public.employees     enable row level security;
alter table public.feedback      enable row level security;
alter table public.review_clicks enable row level security;

-- businesses: owner full access; public can read minimal columns by slug
-- (we'll use a SECURITY DEFINER function for the public read to limit columns)
create policy "owner reads own business"
  on public.businesses for select
  using (auth.uid() = owner_id);

create policy "owner inserts own business"
  on public.businesses for insert
  with check (auth.uid() = owner_id);

create policy "owner updates own business"
  on public.businesses for update
  using (auth.uid() = owner_id);

-- employees: owner full access; public read of active employees per business
create policy "owner manages own employees"
  on public.employees for all
  using (
    exists (select 1 from public.businesses b
            where b.id = employees.business_id and b.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.businesses b
            where b.id = employees.business_id and b.owner_id = auth.uid())
  );

create policy "public reads active employees"
  on public.employees for select
  using (active = true);

-- feedback: anyone can insert (rate-limited at the API layer); only owner reads/updates
create policy "anyone submits feedback"
  on public.feedback for insert
  with check (true);

create policy "owner reads own feedback"
  on public.feedback for select
  using (
    exists (select 1 from public.businesses b
            where b.id = feedback.business_id and b.owner_id = auth.uid())
  );

create policy "owner updates own feedback"
  on public.feedback for update
  using (
    exists (select 1 from public.businesses b
            where b.id = feedback.business_id and b.owner_id = auth.uid())
  );

-- review_clicks: anyone can insert; only owner reads
create policy "anyone logs click"
  on public.review_clicks for insert
  with check (true);

create policy "owner reads own clicks"
  on public.review_clicks for select
  using (
    exists (select 1 from public.businesses b
            where b.id = review_clicks.business_id and b.owner_id = auth.uid())
  );

-- ── Public-safe view for the customer-facing page ───────────────────────
-- Exposes only the fields needed to render /r/[slug] without leaking owner data.
create or replace view public.businesses_public as
select id, slug, name, industry,
       google_review_url, yelp_url, facebook_url, star_threshold
from public.businesses
where subscription_status = 'active';

grant select on public.businesses_public to anon, authenticated;
