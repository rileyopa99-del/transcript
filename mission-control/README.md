# Mission Control

Unified dashboard for managing AI-assisted startup development. Reads all
data from `public/project_state.json` — no backend, read-only for Week 1.

## Stack

- React + Vite
- Tailwind CSS v4
- Deploy target: Vercel

## Development

```bash
npm install
npm run dev
```

## Data

Edit `public/project_state.json` to update what the dashboard displays.
The app fetches it at runtime, so changes are picked up on refresh without
a rebuild. See that file for the expected schema (vision, current_priorities,
architecture_decisions, open_questions, blockers, tasks, tech_stack,
outreach, ideas_log).

## Build

```bash
npm run build
```

Outputs a static site in `dist/`, deployable as-is to Vercel.
