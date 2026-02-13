# Shane Grant — Professional Portfolio

> **shanegrant.nz** — Elite security consultant portfolio site for Shane Grant, NZDF veteran with 30+ years defence operations experience.

## Tech Stack

- **React 19** + **TypeScript** (Vite)
- **Tailwind CSS** (CDN configuration with custom institutional design tokens)
- **Framer Motion** for scroll-linked animations and interaction design
- **Supabase** for contact form submissions + Edge Functions with Resend for email notifications

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
```

## Environment Variables

Copy `.env.example` and fill in your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Project Structure

```
├── components/          # React UI components
│   ├── ui/              # Reusable primitives (HolographicCard, CompetencyCarousel)
│   ├── Hero.tsx          # Hero section with profile + accolades
│   ├── Competencies.tsx  # Competency carousel
│   ├── ServiceRecord.tsx # Animated timeline of NZDF service
│   ├── Honours.tsx       # Citations, personal attributes
│   ├── Contact.tsx       # Supabase-powered contact form
│   ├── Footer.tsx        # Sticky reveal footer
│   └── ...
├── constants.ts         # All portfolio data (roles, awards, etc.)
├── types.ts             # Shared TypeScript interfaces
├── hooks/               # Custom hooks (useScrollAnimation)
├── lib/                 # Supabase client, utilities
├── public/              # Static assets (images, CV PDF, accolades)
├── supabase/functions/  # Edge Function for contact email
└── tools/               # CV PDF generator
```

## Deployment

The site deploys automatically to **Vercel** on push to `main`.

## Built by

[Cleland Studios](https://cleland.studio)
