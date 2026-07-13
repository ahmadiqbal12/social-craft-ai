# SocialCraft AI — frontend (Next.js rebuild)

A TypeScript rebuild of the SocialCraft AI dashboard design (see
`../SocialCraft AI (standalone).html`) on **Next.js 16 (App Router)** with
**Redux Toolkit** for state and real authentication against the existing
`../backend` API.

## Stack

- Next.js 16 (App Router, TypeScript, `src/` layout)
- Redux Toolkit + React Redux (typed hooks, slices, async thunks)
- CSS Modules + CSS custom properties for the light/dark design system
  (no UI framework — mirrors the original design tokens 1:1)
- Custom hooks: `useAuth`, `useTheme`, `useToast`, `useOutsideClick`

## Getting started

```bash
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at your backend
npm install
npm run dev                  # http://localhost:3001
```

The backend (`../backend`) must be running (default `http://localhost:5000`)
with `CORS_ORIGIN=http://localhost:3001` and `credentials: true` so the
httpOnly `accessToken` / `refreshToken` cookies it sets are accepted by the
browser on requests from this app.

> **Local dev only:** cookie matching in browsers ignores port, so cookies
> set by the backend on `localhost:5000` are also sent to `localhost:3001`.
> In production, put both behind the same registrable domain (e.g. via a
> reverse proxy / Next.js rewrites) or switch the backend cookies to
> `sameSite: "none"; secure: true` for a genuinely cross-origin deployment.

## Auth flow

- `POST /auth/login`, `POST /auth/register`, `GET /auth/profile`,
  `POST /auth/logout` are called directly from the browser with
  `credentials: "include"` (see `src/lib/apiClient.ts`).
- `src/middleware.ts` redirects unauthenticated requests to protected routes
  (`/dashboard`, `/studio`, `/calendar`, `/analytics`, `/accounts`,
  `/settings`, `/admin`) to `/login`, based on the presence of the session
  cookies.
- `src/components/auth/AuthGate.tsx` is the client-side safety net: it calls
  `GET /auth/profile` on mount to resolve the real session and hydrate
  `store/slices/authSlice.ts`, redirecting to `/login` if it turns out the
  cookie was stale/expired.
- `/admin` is additionally gated to `role === "admin"` users (see the backend's
  `ROLE_PERMISSIONS` in `../backend/src/config/role.js`).

## Project layout

```
src/
  app/                 routes (login, register, (app)/* protected group)
  components/
    auth/              LoginForm, RegisterForm, AuthGate
    layout/            Sidebar, Header, menus, AppShell, ToastViewport
    dashboard/         stat cards, chart, activity, upcoming posts, accounts
    studio/            Content Studio — AI caption/image generation, scheduling
    settings/          tabbed settings (profile, security, notifications, billing, api)
    admin/             users table, moderation queue, platform health
    accounts/          social account connect/disconnect (OAuth)
    common/            Icon registry, PlaceholderScreen
  hooks/               useAuth, useTheme, useToast, useOutsideClick, useSocialAccounts
  store/               Redux store, StoreProvider, slices/{auth,ui}Slice.ts
  lib/
    api/               typed wrappers per backend resource: authApi, contentApi,
                        socialApi, jobsApi (AI job polling)
    apiClient.ts, constants.ts, studioContent.ts, settingsContent.ts,
    adminContent.ts, socialPlatforms.ts, utils.ts
  types/               auth, nav, dashboard, ui, studio, settings, admin, api types
  middleware.ts
```

## What's wired to the real backend vs. still local-only

Auth, **Content Studio**, **Settings → Profile/Security**, **Admin → Users**,
and **Social Accounts** (including the Dashboard's "Connected accounts" card)
all call the real `../backend` API — see `src/lib/api/*`. Specifically:

- **Studio**: `POST /content/generate` (queued AI job) per selected platform,
  polled via `GET /jobs/:jobId` (`src/lib/api/jobsApi.ts`) until it resolves;
  results are real, persisted `Content` documents. Scheduling calls
  `PATCH /content/schedule/:contentId`. The "Visual idea" card generates a
  real OpenAI image the same way (`type: "image"`).
- **Settings**: name/email save via `PATCH /auth/update-account`, photo via
  `PATCH /auth/profile-image`, password via `PATCH /auth/change-password`.
  Notifications, Billing, API Keys, 2FA and session lists have no backend
  model yet, so those tabs stay local-only — each is labeled "Demo only" in
  the UI.
- **Admin**: the users table is a live, read-only `GET /auth/users`. Row
  actions (suspend/remove) are disabled with a tooltip — the backend has no
  endpoint to mutate other users yet, only the caller's own account.
- **Accounts**: `GET/DELETE /social` are real; "Connect" does a full-page
  redirect into the backend's Passport OAuth flow. Only **Google** has a
  registered strategy server-side today (see `../backend/src/config/passport.js`)
  — Facebook/Instagram/LinkedIn need their OAuth app credentials added to
  `../backend/.env` before those buttons will complete a real connection.

Dashboard stats, the performance chart, and recent-activity feed remain
static mock data (`src/lib/constants.ts`) — there's no analytics model/route
on the backend yet (`analytics.controller.js` is an empty stub). Calendar and
Analytics are still the polished empty-state placeholders.

Two small, deliberately minimal changes were made to the backend to make the
above actually work end-to-end locally, not just call the right URLs:

1. `../backend/.env`: `CORS_ORIGIN` was `*`, which browsers reject for
   credentialed requests — changed to `http://localhost:3001`.
2. `../backend/src/controllers/social.controller.js` +
   `routes/social.route.js`: the OAuth callback used to respond with raw
   JSON (and `failureRedirect: "/login"` pointed at the *backend*, a 404).
   Both now redirect back into this app (`CLIENT_URL/accounts?...`) instead.
