# Event Surge Planner

> GCC calendar-aware demand forecasting — Ramadan, Eid, Dubai Shopping Festival, White Friday, National Day.

Built with Next.js 16, Supabase, and Claude AI (Anthropic).

## The Problem

UAE FMCG brands run out of stock during Ramadan. Every year. The same SKUs. The same problem.

Generic forecasting tools don't know that:
- Ramadan shifts **11 days earlier every year** (Islamic calendar)
- Fragrance demand peaks in **Week 3–4** of Ramadan (gift-giving), not Week 1
- Dubai Shopping Festival consumer behavior is different from Black Friday (residents stock up, not tourists)

## The Solution

Event Surge Planner maps your 3 years of sales history against the GCC event calendar and generates per-SKU demand forecasts with specific order recommendations.

**What you get:**
- Event demand forecast by SKU (with confidence bands: lower/upper)
- Order calendar: *"Place PO for SKU-123 by Nov 15"* (lead-time aware)
- Surge heat map — weeks × categories
- Alert: *"You have 3 SKUs at risk for Eid al-Adha"*

## GCC Events Covered

| Event | Typical Surge | Pre-order Lead |
|-------|--------------|----------------|
| Ramadan | 3.5× | 21 days |
| Eid al-Fitr | 2.5× | 14 days |
| Eid al-Adha | 2.0× | 14 days |
| Dubai Shopping Festival | 2.8× | 7 days |
| White Friday | 4.0× | 7 days |
| UAE National Day | 1.5× | 3 days |

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **AI:** Claude API (claude-sonnet-4-6)
- **Styling:** TailwindCSS v4 + shadcn/ui

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase + Anthropic keys
npm run dev
```

Run the database migration in your Supabase SQL Editor:
```
supabase/migrations/001_initial.sql
```

## Target Market

UAE/GCC FMCG brands and distributors selling through Lulu Hypermarket, Carrefour, Spinneys, Noon, Amazon UAE.

**Pricing:** AED 4,500/month (~$1,200)

---
*Built by [Vinayak Bhadani](https://github.com/bhadanivinayak)*
