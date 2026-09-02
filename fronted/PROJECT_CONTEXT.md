# PM-AJAY Saathi — Project Context

Use this file as the source of truth for future frontend coding sessions.

## Project name

**PM-AJAY Saathi**

An AI-powered livelihood and skill recommendation assistant for beneficiaries of **PM-AJAY** (Pradhan Mantri Anusuchit Jaati Abhyuday Yojana).

The git repository folder is `pm-ajay-ai-livelihood-assistant`. The Vite app lives in `fronted/` (existing spelling; do not rename unless asked).

## Purpose of the SIH MVP

Build a Smart India Hackathon (SIH) demo that helps beneficiaries:

1. Complete a short skill / interest / local-context assessment.
2. Receive AI-generated recommendations for skills, training pathways, and livelihood options.
3. View a simple dashboard of progress and suggested next steps.

The MVP should look like a credible government / public-service product: clear language, multilingual entry, and a guided flow from Home → Assessment → Recommendations → Dashboard.

## Problem being solved

Many PM-AJAY beneficiaries do not have an easy way to:

- Understand which skills match their background and interests.
- Find suitable training or courses.
- Discover self-employment or wage opportunities linked to the scheme.
- Get guidance in a language they can use (English, Hindi, Marathi in the current UI).

The assistant reduces that gap with a simple, AI-supported recommendation flow instead of requiring users to interpret scheme documents themselves.

## Target users

- **Primary:** PM-AJAY beneficiaries seeking skills, training, or livelihood support.
- **Secondary (later, not in current UI):** field facilitators / officials who may help a beneficiary complete the assessment.
- **Demo audience:** SIH judges and mentors reviewing a working frontend + planned backend/AI pipeline.

Design for low friction: short copy, large buttons, simple cards, and a mobile-friendly layout.

## Frontend technology stack

| Layer | Choice |
| --- | --- |
| UI library | React 19 |
| Bundler | Vite 8 |
| Language | **JavaScript only** (`.jsx`) — no TypeScript |
| Styling | Plain CSS (`src/index.css`, `src/App.css`) |
| Routing | React state in `App.jsx` (`currentPage`) — **React Router is not installed** |
| HTTP / API | None yet |
| Backend | None in this package |

Scripts: `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`.

## Current frontend structure

```
fronted/src/
  App.jsx                 # Shell, page state, footer
  main.jsx                # React mount
  index.css               # Tokens, reset
  App.css                 # Layout, navbar, cards, buttons
  components/
    Navbar.jsx
  pages/
    Home.jsx
    Assessment.jsx        # Placeholder
    Recommendations.jsx   # Placeholder
    Dashboard.jsx         # Placeholder
```

### Navigation

`App.jsx` keeps `currentPage`: `home` | `assessment` | `recommendations` | `dashboard`.  
`Navbar` and Home’s **Start Assessment** call `onNavigate(pageId)`. No URL routing yet.

### Pages and components

| File | Status | Behaviour |
| --- | --- | --- |
| `Navbar.jsx` | Implemented | Brand + Home / Assessment / Recommendations / Dashboard |
| `Home.jsx` | Implemented | Headline, description, Start Assessment, language buttons (en / hi / mr), three info cards |
| `Assessment.jsx` | Placeholder | Copy only; no form |
| `Recommendations.jsx` | Placeholder | Copy only; no recommendation cards from API |
| `Dashboard.jsx` | Placeholder | Copy only; no progress data |

Language selection on Home is **local UI state only**. It does not change copy or persist.

Visual language: light background, navy/blue and green accents, cards, government-inspired but modern. Avoid heavy animation.

## Planned MVP features (frontend)

1. **Assessment form** — simple questions (skills, interests, education, location, livelihood preference). Store answers in React state first; later POST to backend.
2. **Recommendations view** — cards for skills, training pathways, livelihood options, and next actions from the AI/backend response.
3. **Dashboard** — assessment status, saved recommendations, follow-up steps, scheme-related summary (can stay mock until API exists).
4. **Language** — lift language out of Home and apply it across pages (English, हिंदी, मराठी). Full i18n can stay lightweight (object maps) unless a library is requested.
5. **Navigation** — keep state-based routing unless deep links are required; then add React Router.
6. **API client** — only after Person 2 exposes endpoints. No fetch layer until then.

## Person 1 responsibilities (this frontend)

Person 1 owns the **Vite React app** in `fronted/`:

- UI/UX, layout, CSS, accessibility of core screens.
- Assessment form UX and client-side validation.
- Rendering recommendations and dashboard from mock data, then from API JSON.
- Language toggle and consistent public-service styling.
- Wiring the UI to Person 2’s APIs when they are ready.
- Not building the ML model, database, or production backend.

## Person 2 responsibilities (backend / AI)

Person 2 owns the **server, data, and recommendation logic** (separate from this package):

- API for submitting assessments and returning recommendations.
- Beneficiary/session storage as needed for the MVP.
- AI / rule-based engine that maps assessment answers to skills, training, and livelihood options aligned with PM-AJAY.
- Scheme/training/livelihood reference data.
- CORS, validation, and a stable JSON contract for the frontend.
- Auth only if the MVP truly needs it; prefer a simple unauthenticated demo flow first.

Person 2 should not rewrite the React app. Share sample JSON and endpoint docs with Person 1.

## API integration plan

**Now:** no backend, no `fetch`, no env-based API URL.

**When Person 2 is ready:**

1. Agree a small contract, for example:
   - `POST /api/assessments` — body: assessment answers; response: profile id + recommendations.
   - `GET /api/recommendations/:id` — optional reload of results.
   - `GET /api/dashboard/:id` — optional summary for Dashboard.
2. Add a single API base URL (e.g. `import.meta.env.VITE_API_URL`) without changing package.json unless a client library is required (prefer native `fetch`).
3. Keep UI working with mock JSON if the server is down.
4. Map backend fields onto recommendation cards; do not couple CSS to backend shape.
5. Do not add auth, websockets, or extra frameworks unless the SIH demo needs them.

Until that contract exists, continue with placeholders and local state.

## Important development rules

- **JavaScript only.** Do not convert the app to TypeScript.
- **Do not add a backend inside `fronted/`.**
- **Do not add API calls until Person 2’s contract is agreed.**
- **Do not change `package.json` / install libraries unless necessary** (no React Router, UI kits, or CSS frameworks by default).
- Keep pages under `src/pages/` and shared UI under `src/components/`.
- Prefer simple, professional, accessible UI over visual complexity.
- Preserve the product name **PM-AJAY Saathi** and the four-page information architecture.
- Match existing CSS tokens (navy, blue, green, cards, spacing) when adding screens.
- Do not commit secrets. `node_modules` and `dist` stay gitignored.
- For new AI sessions: read this file first, then inspect `src/` before editing.
