# Portfolio Website - Muhammad Haikal
## Source Code Package

### Teknologi
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Framer Motion (animasi)
- Enter Cloud / Supabase (database + auth)
- Lucide React (icons)
- JSZip

### Cara Setup
1. Install Node.js >= 18
2. Install pnpm: npm install -g pnpm
3. Install dependencies: pnpm install
4. Setup Enter Cloud / Supabase project
5. Update src/integrations/supabase/client.ts dengan URL & key project Anda
6. Jalankan database_schema.sql di SQL Editor
7. Jalankan: pnpm dev

### Admin Panel
- URL      : /admin/login
- Email    : namahaikal8@gmail.com
- Password : Haikal@112233

### Halaman
- /              → Beranda
- /tentang-saya  → Tentang Saya
- /pengalaman    → Pengalaman Kerja
- /project       → Portfolio Project
- /keterampilan  → Keterampilan
- /kontak        → Kontak (WhatsApp)
- /admin         → Admin Panel
- /download      → Download Files

### Struktur Database
- profile, experiences, projects
- skills_technical, skills_soft
- education, about_traits, stats
