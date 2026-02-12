# ⚖️ GEMINI — Project Constitution
## shanegrant.nz
**This document is LAW. All code must conform to these definitions.**

---

## 1. Project Identity
- **Domain**: shanegrant.nz
- **Type**: Professional landing page / digital CV
- **Subject**: Shane Grant — Security & Protective Services Professional (Defence-Experienced)
- **North Star**: Polish and ship as a professional landing page for job applications in security/defence.
- **Target Audience**: HR recruiters, hiring managers, army officials.
- **Design Language**: Softened military-professional — authoritative, calm, disciplined, procedurally precise.

---

## 2. Integrated Services & Data

### 2.1 Integrations
| Service | Purpose | Key Location |
|---------|---------|-------------|
| **Resend** | Email delivery (Contact Form) | `.env` → `RESEND_API_KEY` |
| **Supabase** | Document Storage (CV PDF) | `.env` → `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |
| **Vercel** | Hosting & Serverless Functions | GitHub Integration |

### 2.2 Data Schemas

#### Contact Form Submission (Input → API)
```json
{
  "type": "object",
  "required": ["name", "email", "subject", "message"],
  "properties": {
    "name": { "type": "string", "minLength": 1 },
    "email": { "type": "string", "format": "email" },
    "subject": {
      "type": "string",
      "enum": [
        "Job Opportunity",
        "Networking Inquiry",
        "Reference Request",
        "General Enquiry"
      ]
    },
    "message": { "type": "string", "minLength": 10 }
  }
}
```

#### Profile Data (Static — constants.ts)
Derived from `assets/c.v`.
- **Profile Stats**: Key service metrics (Years, Clearance, etc.).
- **Competencies**: Core skills (Access Control, CCTV, De-escalation, etc.).
- **Service Record**: Work history (Trentham Camp, Sinai, etc.).
- **Awards**: Medals and qualifications.
- **References**: Available on request (or listed if authorized).

---

## 3. Behavioral Rules

### 3.1 Design Direction: "Softened Military-Professional"
- **Tone**: "Calm, disciplined, and procedurally precise."
- **Visuals**: Clean, structured, high-readability. Remove aggressive "gamer/tactical" effects (scanlines, glitches). Use subtle military cues (stencil typography accents, olive/sand palette) but prioritizing civilian professional standards.
- **Status**: Ready for deployment.

### 3.2 Content Rules
1. **Source of Truth**: `assets/c.v` is the master document for all copy.
2. **Contact Details**: 
   - Phone: `021 210 9665`
   - Email: `Grantshane411@gmail.com` (for display/reply-to)
   - Location: Paraparaumu, Wellington Region
3. **Privacy**: Verification required before exposing full reference contact details publicly? (Default: "Available on request" or gated). *Update: CV includes them, so we will display them unless instructed otherwise.*

### 3.3 Do-Not Rules
1. DO NOT include salary expectations.
2. DO NOT use placeholder text (Lorem Ipsum) in the final build.
3. DO NOT expose `RESEND_API_KEY` to the client (browser).

---

## 4. Architectural Invariants

### 4.1 Tech Stack
- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS.
- **Backend (Serverless)**: Vercel Functions (`api/send.ts`).
- **Storage**: Supabase Storage (Bucket: `public-assets` or `documents`).
- **Deployment**: GitHub → Vercel.

### 4.2 File Structure
```
shanegrant.nz-main/
├── gemini.md              # Constitution
├── task_plan.md           # Plan
├── assets/                # Raw content (c.v)
├── components/            # UI Components
├── lib/                   # Shared logic (Supabase client)
├── api/                   # Serverless Functions
│   └── send.ts            # Email Handler
├── public/                # Static assets (favicons, etc.)
└── constants.ts           # Content Source (derived from CV)
```

---

## 5. Maintenance Log
| Date | Change | Author |
|------|--------|--------|
| 2026-02-11 | Integrated Supabase for Storage & Updated CV Content | System Pilot |
| 2026-02-11 | Project Constitution Initialized | System Pilot |
