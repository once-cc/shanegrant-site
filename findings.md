# 🔍 Findings — shanegrant.nz
**Last Updated**: 2026-02-11T18:23 NZST

---

## Discovery Answers (Phase 1)

### Q1 — North Star
- Polish and ship as a **professional landing page for job applications** in security/defence
- CV and cover letter exist — will be placed in `/assets/` for reference
- These documents need improvements

### Q2 — Integrations
- **Email delivery**: Contact form → Shane's email via Resend API
- No other integrations required
- No Supabase needed

### Q3 — Source of Truth
- **Static data only** — `constants.ts` is sufficient
- No backend database required
- CV/cover letter content will inform `constants.ts` updates

### Q4 — Delivery Payload
- **GitHub** → **Vercel** deployment
- Domain: `shanegrant.nz` (Vercel domain)
- Contact form emails delivered directly to Shane

### Q5 — Behavioral Rules
- **Soften** the military-tactical aesthetic (keep heritage, reduce harshness)
- Target: HR recruiters, hiring managers, army officials

---

## Initial Codebase Audit (Protocol 0)

### Architecture
- **Framework**: React 19.2.4 + TypeScript + Vite 6.2.0
- **Styling**: Tailwind CSS v3 (CDN — `cdn.tailwindcss.com`)
- **No router** — Single-page application (SPA), no React Router
- **No backend** — Contact form is purely visual, no submission logic
- **No `.env`** — No API keys or secrets configured
- **No tests** — No testing framework installed

### Design System
- **Color Palette**: Olive Green (#4d5421), Gold Accent (#d4a017), Sand tones (#f0efe9, #e6e4dc), Tech Dark (#1a1c20)
- **Fonts**: Chakra Petch (display), Oswald (headers), Inter (body), Courier Prime (mono)
- **Visual Language**: Military/tactical — scan lines, grid patterns, corner brackets, ribbon medals
- **Background FX**: Digital camo SVG patterns, concrete texture, film grain

### Component Inventory
| Component | Lines | Purpose |
|-----------|-------|---------|
| `Hero.tsx` | 96 | Hero banner with service profile card |
| `Competencies.tsx` | ~50 | Core competency cards |
| `ServiceRecord.tsx` | ~80 | Career timeline/history |
| `Honours.tsx` | ~80 | Awards & medals display |
| `Contact.tsx` | 78 | Contact form (non-functional) |
| `Header.tsx` | ~60 | Navigation header |
| `Footer.tsx` | ~40 | Site footer |
| `BackgroundEffects.tsx` | ~20 | Global background patterns |

### Constraints Discovered
1. Contact form has placeholder data (email: `shane.svc@example.co.nz`, phone: `+64 21 000 0000`)
2. Title says "Modern Command Variant - Shane" — needs finalization
3. No SEO meta tags beyond title
4. No favicon configured
5. Skills directory contains a cloned repo (ui-ux-pro-max-skill) — utility reference

---

## Email Delivery Research

### Decision: Resend via Vercel Serverless Function
**Why Resend over alternatives:**

| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| **Resend** | Free tier (100/day), clean API, React Email support, Vercel-native | Requires domain verification | ✅ SELECTED |
| **EmailJS** | Client-side, no backend needed | Exposes keys client-side, less professional | ❌ Security risk |
| **Web3Forms** | Zero config, free | Third-party dependency, limited customization | ❌ Less control |
| **Formspree** | Simple HTML integration | 50 submissions/mo free, branding on free tier | ❌ Free tier too limited |

### Implementation Plan
1. Create Vercel Serverless Function at `/api/send.ts`
2. Use Resend SDK to deliver emails
3. RESEND_API_KEY stored as Vercel Environment Variable (never client-side)
4. Contact form submits POST to `/api/send`
5. Email template uses clean HTML (not React Email — keeps it simple)

---

## Design Direction Research

### "Softened Military-Professional" Aesthetic
**Key principles from research:**
1. **Reduce tactical harshness**: Remove scan lines, heavy camo, neon-green HUD effects
2. **Warm the palette**: Shift from pure dark (#1a1c20) to warmer slate/charcoal tones
3. **More whitespace**: Let content breathe — HR recruiters scan quickly
4. **Professional typography**: Keep Inter (body) but consider upgrading display/header fonts
5. **Structural authority**: Keep clean grid layouts, corner brackets, monospace accents — these communicate precision without being aggressive
6. **Color refinement**: Soften olive green toward a more sophisticated tone, keep gold accent but reduce saturation

### Target Visual References
- Executive resume websites with military heritage
- Clean portfolio sites with structured, editorial layouts
- Government/defence sector professional pages (approachable + authoritative)
