-- ============================================
-- ROLLERSONLY DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────
-- Extends Supabase auth.users with platform-specific data
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique not null,
  full_name text,
  avatar_url text,
  location text,
  bio text,
  tier text not null default 'fancier' check (tier in ('fancier', 'breeder', 'elite')),
  is_verified boolean default false,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── LOFTS ─────────────────────────────────────
-- A breeder's public profile / storefront
create table public.lofts (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  slug text unique not null,
  location text,
  country text,
  description text,
  logo_url text,
  banner_url text,
  is_elite boolean default false,
  elite_verified_at timestamptz,
  total_birds_sold integer default 0,
  total_championships integer default 0,
  rating numeric(3,2) default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── BIRDS ─────────────────────────────────────
-- Every registered bird on the platform
create table public.birds (
  id uuid default uuid_generate_v4() primary key,
  platform_id text unique not null, -- human-readable ID like RO-2026-00001
  loft_id uuid references public.lofts(id) on delete set null,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  name text,
  ring_number text,
  sex text check (sex in ('cock', 'hen', 'unknown')),
  color text,
  mutation text,
  birth_year integer,
  birth_month integer,
  -- Pedigree links
  sire_id uuid references public.birds(id) on delete set null,
  dam_id uuid references public.birds(id) on delete set null,
  -- Performance
  fly_score numeric(5,2),
  kit_score numeric(5,2),
  roll_quality text,
  -- Certifications
  health_certified boolean default false,
  health_cert_date date,
  health_cert_url text,
  dna_certified boolean default false,
  dna_cert_date date,
  dna_cert_url text,
  -- Media
  primary_photo_url text,
  -- Status
  is_active boolean default true,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Bird photos (multiple per bird)
create table public.bird_photos (
  id uuid default uuid_generate_v4() primary key,
  bird_id uuid references public.birds(id) on delete cascade not null,
  url text not null,
  is_primary boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- Bird competition results
create table public.bird_results (
  id uuid default uuid_generate_v4() primary key,
  bird_id uuid references public.birds(id) on delete cascade not null,
  competition_name text not null,
  competition_date date,
  placement integer,
  score numeric(5,2),
  category text,
  organization text, -- NBRC, World Cup, Regional, etc.
  verified boolean default false,
  notes text,
  created_at timestamptz default now()
);

-- ── AUCTIONS ──────────────────────────────────
create table public.auctions (
  id uuid default uuid_generate_v4() primary key,
  bird_id uuid references public.birds(id) on delete restrict not null,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  loft_id uuid references public.lofts(id) on delete set null,
  title text not null,
  description text,
  -- Pricing
  reserve_price numeric(10,2) not null default 0,
  starting_bid numeric(10,2) not null,
  current_bid numeric(10,2),
  buy_now_price numeric(10,2),
  bid_increment numeric(10,2) not null default 25,
  -- Timing
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  -- Status
  status text not null default 'scheduled'
    check (status in ('scheduled', 'live', 'ended', 'sold', 'cancelled')),
  -- Media (breeder submits same-day video)
  video_url text,
  video_submitted_at timestamptz,
  -- Winner
  winner_id uuid references public.profiles(id) on delete set null,
  final_price numeric(10,2),
  -- Escrow
  escrow_held boolean default false,
  escrow_released boolean default false,
  escrow_released_at timestamptz,
  -- Shipping
  shipping_confirmed_at timestamptz,
  buyer_confirmed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── BIDS ──────────────────────────────────────
create table public.bids (
  id uuid default uuid_generate_v4() primary key,
  auction_id uuid references public.auctions(id) on delete cascade not null,
  bidder_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(10,2) not null,
  is_winning boolean default false,
  created_at timestamptz default now()
);

-- ── PEDIGREE REQUEST LOG ───────────────────────
-- Tracks AI matchmaking requests
create table public.matchmaking_requests (
  id uuid default uuid_generate_v4() primary key,
  requester_id uuid references public.profiles(id) on delete cascade not null,
  bird_a_id uuid references public.birds(id) on delete cascade not null,
  bird_b_id uuid references public.birds(id) on delete cascade not null,
  ai_analysis text,
  inbreeding_coefficient numeric(5,4),
  recommendation text check (recommendation in ('strong', 'compatible', 'caution', 'avoid')),
  common_ancestors jsonb,
  created_at timestamptz default now()
);

-- ── COMPETITION LEADERBOARDS ───────────────────
create table public.competitions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  organization text not null, -- NBRC, World Cup, Regional
  season text,
  location text,
  competition_date date,
  category text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

create table public.leaderboard_entries (
  id uuid default uuid_generate_v4() primary key,
  competition_id uuid references public.competitions(id) on delete cascade not null,
  loft_id uuid references public.lofts(id) on delete cascade not null,
  bird_id uuid references public.birds(id) on delete set null,
  placement integer not null,
  score numeric(6,2),
  kit_size integer,
  notes text,
  created_at timestamptz default now()
);

-- ── FLY VIDEOS ────────────────────────────────
create table public.fly_videos (
  id uuid default uuid_generate_v4() primary key,
  loft_id uuid references public.lofts(id) on delete cascade not null,
  uploader_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  video_url text not null,
  thumbnail_url text,
  competition_id uuid references public.competitions(id) on delete set null,
  description text,
  view_count integer default 0,
  created_at timestamptz default now()
);

-- ── REVIEWS ───────────────────────────────────
create table public.loft_reviews (
  id uuid default uuid_generate_v4() primary key,
  loft_id uuid references public.lofts(id) on delete cascade not null,
  reviewer_id uuid references public.profiles(id) on delete cascade not null,
  auction_id uuid references public.auctions(id) on delete set null,
  rating integer not null check (rating between 1 and 5),
  body text,
  created_at timestamptz default now(),
  unique (loft_id, reviewer_id, auction_id)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

alter table public.profiles enable row level security;
alter table public.lofts enable row level security;
alter table public.birds enable row level security;
alter table public.bird_photos enable row level security;
alter table public.bird_results enable row level security;
alter table public.auctions enable row level security;
alter table public.bids enable row level security;
alter table public.matchmaking_requests enable row level security;
alter table public.competitions enable row level security;
alter table public.leaderboard_entries enable row level security;
alter table public.fly_videos enable row level security;
alter table public.loft_reviews enable row level security;

-- Profiles: public read, owner write
create policy "Profiles are public" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- Lofts: public read, owner write
create policy "Lofts are public" on public.lofts for select using (true);
create policy "Owners can insert loft" on public.lofts for insert with check (auth.uid() = owner_id);
create policy "Owners can update loft" on public.lofts for update using (auth.uid() = owner_id);

-- Birds: public read, owner write
create policy "Birds are public" on public.birds for select using (true);
create policy "Owners can insert bird" on public.birds for insert with check (auth.uid() = owner_id);
create policy "Owners can update bird" on public.birds for update using (auth.uid() = owner_id);

-- Bird photos: public read, bird owner write
create policy "Bird photos are public" on public.bird_photos for select using (true);
create policy "Bird owners can manage photos" on public.bird_photos for insert
  with check (exists (select 1 from public.birds where id = bird_id and owner_id = auth.uid()));

-- Auctions: public read, seller write
create policy "Auctions are public" on public.auctions for select using (true);
create policy "Sellers can insert auctions" on public.auctions for insert with check (auth.uid() = seller_id);
create policy "Sellers can update auctions" on public.auctions for update using (auth.uid() = seller_id);

-- Bids: public read, authenticated insert
create policy "Bids are public" on public.bids for select using (true);
create policy "Authenticated users can bid" on public.bids for insert with check (auth.uid() = bidder_id);

-- Competitions and leaderboards: fully public
create policy "Competitions are public" on public.competitions for select using (true);
create policy "Leaderboard is public" on public.leaderboard_entries for select using (true);

-- Fly videos: public read, uploader write
create policy "Fly videos are public" on public.fly_videos for select using (true);
create policy "Uploaders can insert videos" on public.fly_videos for insert with check (auth.uid() = uploader_id);

-- Reviews: public read, reviewer write
create policy "Reviews are public" on public.loft_reviews for select using (true);
create policy "Reviewers can insert reviews" on public.loft_reviews for insert with check (auth.uid() = reviewer_id);

-- Matchmaking: owner only
create policy "Users see own matchmaking" on public.matchmaking_requests for select using (auth.uid() = requester_id);
create policy "Users can request matchmaking" on public.matchmaking_requests for insert with check (auth.uid() = requester_id);

-- ============================================
-- REALTIME (for live auction bid updates)
-- ============================================
alter publication supabase_realtime add table public.bids;
alter publication supabase_realtime add table public.auctions;

-- ============================================
-- AUTO-UPDATE updated_at TIMESTAMPS
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();
create trigger lofts_updated_at before update on public.lofts
  for each row execute function public.handle_updated_at();
create trigger birds_updated_at before update on public.birds
  for each row execute function public.handle_updated_at();
create trigger auctions_updated_at before update on public.auctions
  for each row execute function public.handle_updated_at();

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
