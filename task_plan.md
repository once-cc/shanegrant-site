# 📋 Task Plan — shanegrant.nz
**Protocol**: B.L.A.S.T.
**Status**: 🟢 BLUEPRINT APPROVED — EXECUTION MODE

---

## Phase 0: Initialization ✅
- [x] Create Project Memory Files
- [x] Audit Codebase
- [x] Discovery & Blueprint Approval

---

## Phase 1: Blueprint ✅
- [x] Strategic Direction: Professional Defence/Security Portfolio
- [x] Integrations: Resend (Email), Supabase (Storage), Vercel (Host)
- [x] Data Source: `assets/c.v` provided

---

## Phase 2: Link (Connectivity)
- [ ] **2.1 Credentials Setup**
    - [ ] Create `.env` file (gitignored)
    - [ ] Add `RESEND_API_KEY`
    - [ ] Add `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`
- [ ] **2.2 Connection Verification**
    - [ ] Create `tools/verify_links.ts` (or similar script) to test connections
    - [ ] Verify Supabase Storage access (list bucket)
    - [ ] Verify Resend API (via test payload)

---

## Phase 3: Architect (Build)

### Layer 1: Data & State
- [ ] **3.1 Update Constants**: Parse `assets/c.v` into `constants.ts`
    - [ ] structured `SERVICE_RECORD`
    - [ ] structured `COMPETENCIES` (Core Capabilities)
    - [ ] structured `PROFILE_STATS`
    - [ ] structured `AWARDS` (Qualifications)
    - [ ] structured `REFERENCES`
- [ ] **3.2 Supabase Client**: Initialize `lib/supabase.ts`

### Layer 2: API
- [ ] **3.3 Email API**: Create `api/send.ts` (Vercel Serverless Function)
    - [ ] Validation logic
    - [ ] Resend integration
    - [ ] Error handling

### Layer 3: UI Implementation
- [ ] **3.4 Design System Refinement** ("Softened Military")
    - [ ] Update Tailwind config (Fonts, Colors: `olive-drab` -> `slate-grey` mix)
    - [ ] Soften borders, reduce "scanline" opacity
- [ ] **3.5 Component Updates**
    - [ ] `Header`: Clean nav, social links?
    - [ ] `Hero`: New copy, download CV button (linked to Supabase)
    - [ ] `Competencies`: Grid layout for "Core Capabilities"
    - [ ] `ServiceRecord`: Timeline view of "Security & Defence Experience"
    - [ ] `Honours`: Qualifications & Certifications
    - [ ] `Contact`: Functional form wired to `api/send`
    - [ ] `Footer`: Copyright, simple links
- [ ] **3.6 Responsive Audit**: Ensure mobile perfection

---

## Phase 4: Stylize
- [ ] Final visual polish
- [ ] Interaction feedback (buttons, form states)

---

## Phase 5: Trigger (Deploy)
- [ ] Git Commit & Push
- [ ] Vercel Project Setup (Env Vars)
- [ ] Domain DNS Config
