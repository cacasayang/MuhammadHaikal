-- ============================================================
-- Portfolio Website - Muhammad Haikal
-- Database Schema Migration
-- ============================================================

-- Profile table
create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Muhammad Haikal',
  title text not null default 'Akuntansi',
  bio text default 'Saya lulusan SMK AL-Hikmah jurusan Akuntansi dengan pengalaman di bidang administrasi, keuangan, dan layanan pelanggan. Berorientasi pada ketepatan data, kerapihan dokumen, dan selalu ingin berkembang untuk memberikan kontribusi terbaik.',
  photo_url text default 'https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100039580/5d3bb448-a3fd-4b.jpeg',
  location text default 'Taman Mangu Indah, Pondok Aren, Tangerang Selatan',
  phone text default '+62 896-7713-3285',
  email text default 'namahaikal8@gmail.com',
  linkedin_url text default '#',
  github_url text default '#',
  instagram_url text default '#',
  whatsapp_number text default '6289677133285',
  cv_url text,
  tagline text default 'Terbuka untuk peluang baru!',
  tagline_sub text default 'Saya siap berkontribusi untuk kemajuan perusahaan Anda.',
  updated_at timestamptz default now()
);

-- Experiences
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  title text not null,
  company text not null,
  category text default '',
  tasks text[] default '{}',
  task_count int default 0,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Projects
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  url text default '',
  image_url text default '',
  is_featured boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Technical Skills
create table if not exists public.skills_technical (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  percentage int default 80,
  sort_order int default 0
);

-- Soft Skills
create table if not exists public.skills_soft (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int default 0
);

-- Education
create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  school text not null,
  major text default '',
  period text default '',
  sort_order int default 0
);

-- About Traits
create table if not exists public.about_traits (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'Star',
  title text not null,
  description text default '',
  color text default 'blue',
  sort_order int default 0
);

-- Stats
create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'Briefcase',
  value text not null,
  label text not null,
  sort_order int default 0
);

-- Enable Row Level Security
alter table public.profile enable row level security;
alter table public.experiences enable row level security;
alter table public.projects enable row level security;
alter table public.skills_technical enable row level security;
alter table public.skills_soft enable row level security;
alter table public.education enable row level security;
alter table public.about_traits enable row level security;
alter table public.stats enable row level security;

-- Public read policies
create policy "Public read profile" on public.profile for select using (true);
create policy "Public read experiences" on public.experiences for select using (true);
create policy "Public read projects" on public.projects for select using (true);
create policy "Public read skills_technical" on public.skills_technical for select using (true);
create policy "Public read skills_soft" on public.skills_soft for select using (true);
create policy "Public read education" on public.education for select using (true);
create policy "Public read about_traits" on public.about_traits for select using (true);
create policy "Public read stats" on public.stats for select using (true);

-- Admin write policies (authenticated users only)
create policy "Admin write profile" on public.profile for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write experiences" on public.experiences for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write projects" on public.projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write skills_technical" on public.skills_technical for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write skills_soft" on public.skills_soft for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write education" on public.education for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write about_traits" on public.about_traits for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "Admin write stats" on public.stats for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
