@AGENTS.md

# Event Surge Planner — Project Context

## What This Is
Event Surge Planner is a SaaS product for GCC event-aware demand forecasting. Ramadan shifts 11 days earlier every year — generic tools miss this. Event Surge Planner gives UAE/GCC FMCG distributors per-SKU demand forecasts with confidence bands, order date recommendations, and a surge heatmap for Ramadan, Eid, DSF, White Friday, and UAE National Day. Price: AED 7,500/month.

## Live URLs
- **Production:** https://event-surge-planner.vercel.app
- **GitHub:** https://github.com/bhadanivinayak/event-surge-planner
- **Supabase:** https://supabase.com/dashboard/project/lyvkwbluqybtapkputxx
- **Vercel:** https://vercel.com/bhadanivinayaks-projects/event-surge-planner

## Stack
- Next.js 16.2.6 (App Router, Turbopack) — see AGENTS.md for breaking changes
- TypeScript, TailwindCSS v4, shadcn/ui
- Supabase (PostgreSQL + Auth + RLS) — project ref: `lyvkwbluqybtapkputxx`
- Claude API (`claude-sonnet-4-6`) for AI forecast generation
- Vercel for deployment (auto-deploys on push to `main`)

## Critical: Next.js 16 Breaking Changes
- `middleware.ts` → renamed to `proxy.ts`, exported function must be named `proxy`
- `cookies()` must be `await`ed in server components
- shadcn `Select.onValueChange` type is `(value: string | null) => void`

## Supabase Setup
- **URL:** `https://lyvkwbluqybtapkputxx.supabase.co`
- **Anon key:** in `.env.local` (never commit this file)
- **Migration:** `supabase/migrations/001_initial.sql` — already run in production Supabase
- **Auth bypass:** When `NEXT_PUBLIC_SUPABASE_URL` is not a real URL, `proxy.ts` and login/signup skip auth (demo mode)

## Database Tables
```
companies, profiles (auto-created on signup via trigger)
data_sources, sop_schedules, sop_packs, action_items
gcc_events (17 events pre-seeded 2025–2027 with surge multipliers)
products, sales_history, event_forecasts
```

## GCC Events Pre-Seeded (Key Data)
| Event | Surge | Why it matters |
|-------|-------|----------------|
| Ramadan | 3.5× | Shifts 11 days/year — biggest forecasting challenge |
| White Friday | 4.0× | UAE's Black Friday — highest single-event surge |
| DSF | 2.8× | 45-day tourism-driven demand |
| Eid al-Fitr | 2.5× | Post-Ramadan gifting peak |
| Eid al-Adha | 2.0× | Sacrificial feast + hospitality |
| UAE National Day | 1.5× | Gifts, F&B, decorations |

## Pages Built
- `/login` — Split-screen dark UI with animated event surge preview
- `/signup` — Company + user registration
- `/dashboard` — KPIs, GCC event countdown, module overview
- `/events` — Two-panel: GCC event list (left) + SKU-level demand forecast viewer (right) with surge heatmap, coverage bars, confidence bands, order date recommendations
- `/connectors` — Data source management
- `/settings` — Company config, alert thresholds

## What's Working
- [x] All UI pages with mock data
- [x] Real Supabase auth (sign up / login / session management)
- [x] Database schema with RLS
- [x] 17 GCC events pre-seeded in database
- [x] Demo mode bypass (works without Supabase credentials)
- [x] Deployed on Vercel — auto-deploys on git push

## What's NOT Built Yet (Next Steps in Order)
1. `/api/events/forecast` — POST endpoint: given company_id + event_id, fetch sales history, call Claude API, generate per-SKU forecasts, save to `event_forecasts` table
2. Excel/CSV parser — upload historical sales → `sales_history` table
3. Order recommendation engine — calculate `recommended_order_date` based on `lead_time_days` per SKU
4. Per-SKU forecast accuracy tracking — compare predicted vs actual after event passes
5. Alert system — email/WhatsApp when SKU coverage drops below threshold before event

## Key Files
```
src/proxy.ts                           — auth gate (replaces middleware.ts)
src/lib/supabase/client.ts             — browser Supabase client with isSupabaseConfigured guard
src/lib/supabase/server.ts             — server Supabase client (await cookies())
src/lib/supabase/types.ts              — full TypeScript DB types
src/app/(auth)/login/page.tsx          — premium split-screen login (green theme)
src/app/(auth)/signup/page.tsx         — company onboarding signup
src/app/(dashboard)/events/page.tsx    — GCC event surge forecast viewer
src/app/globals.css                    — includes sm-* animation classes
supabase/migrations/001_initial.sql    — full DB schema (already run)
```

## Obsidian Vault Notes
Full project documentation at: `/Users/vinayakbhadani/vault/projects/supplymind/`
- `SupplyMind Overview.md` — master index
- `Event Surge Planner.md` — product detail
- `SupplyMind Dev Log.md` — session changelog (update after each session via /tldr)

## After Every Coding Session
Run `/tldr` to append a new entry to the Dev Log in the Obsidian vault.
