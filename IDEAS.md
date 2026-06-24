# Project Ideas & Roadmap

> Living brainstorm of things worth building. Filter: **useful in 5 years.**
> Primary motivation (stated): **tools I'll use daily** — usefulness first.
> (These also happen to age best and impress recruiters as a side effect.)

## ⭐ NEXT UP: "My Developer Team" — AI idea-to-project pipeline

The project to build right after the portfolio. An AI "developer team" dashboard
(same lineage as Job Dashboard) that **generates product ideas, lets Artem
approve/edit them, then assists in building the approved ones — with a widget
tracking each project's progress** (agile board, backlog, % complete). Manage
many "teams"/projects in parallel.

**The core thesis (the smart part):**
> Idea quality = (public signals: trending GitHub repos/topics, what people are
> actually building) **×** (Artem's day-to-day: real friction, calendar, notes).
> Grounding ideas in real data → novel AND useful combinations, not generic slop.
> "No software is good without useful features" — real signals are how you avoid
> the feature-less demo.

**Human-in-the-loop is the design, not a compromise:**
Artem's taste / design sense / product judgment **+** AI's technical execution.
That combination produces good products; full unattended autonomy does not (yet).

**What's real / buildable today:**
- ✅ Idea generation on a schedule via the **Claude API** (Job Dashboard pattern).
- ✅ **GitHub public data** (REST/GraphQL: trending, topics, stars, READMEs) —
  fully legitimate signal, no ToS issue.
- ✅ Personal context Artem owns (calendar/notes/friction) as the second input.
- ✅ Approve/edit/reject queue + DB.
- ✅ Spec + task breakdown + starter scaffold generation (**Claude Agent SDK**).
- ✅ Progress-tracking dashboard + widget across many projects (agile/backlog).

**What needs a reality check (→ research before committing):**
- ⚠️ Fully autonomous "approve → finished, deployed app" is NOT reliable in 2026,
  even with the best agent frameworks. Keep a human in the loop.
- ⚠️ "Gstack" couldn't be identified as a real tool; "superpowers" is a community
  Claude Code plugin not installed in this env; "GSD" is a workflow skill. The
  build engine must rest on REAL available APIs — the **Claude Agent SDK** + the
  **Claude API** — not on naming tools that don't exist here.

**Research brief (run with `deep-research` after portfolio deploys):**
> State of autonomous AI coding agents in 2026 — what the Claude Agent SDK can
> actually build end-to-end vs. where humans must stay in the loop; and how to
> build an idea engine that combines public GitHub signals with personal context
> to produce novel, useful product ideas.

**Why first:** once this pipeline exists, it becomes the factory that helps build
everything else on this roadmap (Artem OS modules, My Network, the handheld, etc).

**Output → portfolio loop (honesty-first):**
- When a dev team ships a COMPLETE product, it only counts after Artem's manual
  checkpoints — security review, reprompt/verify "for peace of mind," final QA.
- Shipped outputs get listed as **"AI-developed projects" — a SEPARATE category**
  from Artem's hand-built work. Clear labeling is the credible move: never blur
  AI-generated work with personal engineering. (A recruiter trusts "here's my
  work + here's a system that autonomously produces vetted products" far more
  than disguised auto-work.)
- The dev team can also **auto-generate each sub-project's preview/launch page
  and take its own screenshots** for the listing — the pipeline documents itself.

## The durability filter

A personal project ages well when it has these properties:

1. **You're the user** — you keep using it, so it keeps improving.
2. **It owns its data** — local-first / self-hosted. Your data + a local DB
   outlives any cloud vendor.
3. **It rides a rising tide** — LLMs-in-the-loop, personal automation, health
   data, local-first sync — not a framework fad.

## Chosen directions (Jun 2026)

Three themes selected to pursue:

### 1. Personal OS / life dashboard — "Artem OS"  ⭐ umbrella narrative
One local-first hub for life data, built as composable **modules**. The
existing projects become its first modules:

- **Module: Jobs** → existing Job Dashboard (shipped).
- **Module: Training** → existing Gym Coach (in progress).
- **Module: Habits / Reading / Finances** → future.
- **Connective tissue:**
  - Universal capture → an LLM auto-routes any note/link/idea to the right
    module.
  - Apple-ecosystem glue: menu-bar app + Shortcuts + widgets surfacing
    "what matters now."
  - Daily brief: each morning an LLM assembles a one-page summary across
    modules.
- **Why it lasts:** you're the demanding customer who never churns; it grows
  forever; it's a strong system-design story.

### 2. Distributed systems  (pairs with Agricola Online)
Infrastructure that's both a learning stretch and genuinely useful underneath
Artem OS.

- **Self-hosted sync engine** — the local-first backbone for Artem OS.
  CRDTs / conflict resolution so modules sync across devices without a cloud
  vendor. Hard, impressive, and infrastructure you'd actually depend on.
- **Go job queue / task runner** — generalize the launchd scheduler pattern
  from Job Dashboard into a reusable Go service.
- **Agricola Online** (already a portfolio flagship) — Go + WebSockets +
  Redis + Kubernetes. See `docs/agricola-architecture.md`.

### 3. Embedded handheld console for pass-and-play games  🆕
> **Scoped (Jun 2026):** A custom **system-on-chip / embedded** handheld — a
> physical device you pass around the table to play turn-based / party games.
> A homemade "digital board-game console." Hardware + firmware + games.

**The pitch:** one shared handheld, no accounts, no network — pick it up, play
a game, pass it to the next person. The anti-cloud, anti-subscription toy that
just works and that you actually own.

**Why it lasts (5-yr filter):**
- You own it end-to-end (hardware + software) — nothing can deprecate it.
- It's a deep, rare skill story: embedded/systems programming, which most
  web-focused devs never touch — strong differentiation.
- It pairs with the turn-based **state-machine** work from Agricola: the same
  rules-engine discipline, but running **locally** on constrained hardware
  instead of over a network.

**Likely stack / decisions (to refine):**
- **Hardware target:** Raspberry Pi (Zero 2 W / Pi 4 — easiest, Linux) →
  later possibly ESP32 / RP2040 (bare-metal, harder, more impressive) once the
  software is proven. Recommend starting on a Pi to iterate fast, port down to
  bare-metal as a stretch.
- **Display + input:** small TFT/e-ink screen + buttons (a hat or wired GPIO).
- **Language:** Rust or Go for the game/firmware layer (memory-safe systems
  langs that look great on a resume); C if going truly bare-metal.
- **Game engine:** a tiny turn-based engine — share the Agricola-style
  `apply(action, state) -> state` pattern; ship 2–3 simple pass-and-play games
  first (e.g. a card game, a dice game, a light board game).

**Build milestones:**
1. Pi + screen + buttons "hello world" — render a menu, read button input.
2. One complete pass-and-play game (rules engine + simple UI on the screen).
3. A game-selection shell + a second game (proves the engine generalizes).
4. Polish: enclosure/case, battery, boot-to-game (kiosk mode).
5. Stretch: port the engine to a bare-metal MCU (ESP32/RP2040).

**Open questions to decide later:** exact hardware, which 2–3 launch games,
Rust vs Go, screen tech (TFT vs e-ink).

### "My Network" — personal relationship graph  🆕 (Artem OS module)

Already prototyped inside the personal dashboard app. A force-directed
visualization of the people around you and how they connect — a fun, beautiful
way to see your own social graph.

**Buildable, privacy-respecting version (do this):**
- You populate it yourself, and/or import from **data you legitimately own**:
  your own Instagram/Google "Download your data" exports, your contacts,
  calendar. Never other people's hidden data.
- Force-directed graph (D3 or Three.js / 3d-force-graph) with notes per person:
  how you know them, last contact, shared context, tags.
- Fits "Artem OS" as a module; great portfolio visual (interactive,
  data-driven, looks impressive).

**Hard limit — do NOT build:** pulling friends'/others' connection data from
Instagram/Meta/etc. Their APIs don't expose the social graph by design,
scraping it violates ToS (account-ban risk) and is a privacy problem. "Data
the platforms hide" is fenced off legally and intentionally. Keep this to data
the user owns and consents to.

### Could this become a real product? — "Personal OS" for others

Vision: a privacy-first, local-first app combining a **relationship graph** +
**personal data tracking** + **AI life coaching** — built on data the user
owns (their own exports, contacts, health). Give people back the data
platforms hoard, in one system they control.

- **Cool? Yes** — and the *integrated, privacy-first* combo is a real wedge.
  Pieces exist separately (Monica = personal CRM; Exist.io / Gyroscope =
  quantified self; Reflect / Tana / Mem = AI notes; Rewind / Limitless = life
  logging) but nobody owns relationship-graph + life-data + coaching, local-first.
- **Done already? No** — not as one integrated product. The differentiator is
  the combination + the privacy/ownership stance.
- **Claude tier needed?** Just the **Claude Developer Platform (API)** — pay
  per token, no contract, sign up with a card. Same thing Job Dashboard already
  uses (claude-opus-4-8, structured output). **NOT** Claude Enterprise (that's
  for big companies — SSO/compliance/seats); **NOT** Pro/Max (that's the chat
  app subscription, not for powering your own app). Use the `claude-api` skill
  for exact model IDs + pricing when building.
- **Path:** start as a personal "My Network" + Artem OS module → if it's
  genuinely useful to you, generalize to a multi-user product later.

## Idea backlog (not yet selected)

- LLM personal knowledge base with semantic search (RAG over own notes/docs).
- Email/calendar triage agent (extends Job Dashboard's classify pattern to all mail).
- Unified health hub: Apple Health + Strava + Gym Coach in one trend view.
- Adaptive training engine (the "brain" inside Gym Coach: periodization, deloads, readiness from sleep/HRV).

## Portfolio design references (free / public)

- Example dev portfolios: brittanychiang.com, tania.dev, GitHub topic
  `developer-portfolio`.
- Design fundamentals: Refactoring UI (free articles), Apple HIG, Material
  Design, web.dev (perf/SEO).
- Optional: run the `deep-research` skill for a cited "hiring-optimized dev
  portfolio 2026" brief — AFTER v1 ships.

## How this feeds the portfolio

- Shipped modules → real Projects entries (replace placeholders).
- Sync engine + Agricola → the "distributed systems" depth story.
- Artem OS → the cohesive umbrella that ties scattered projects into ONE
  multi-year system narrative.
