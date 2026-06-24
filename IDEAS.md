# Project Ideas & Roadmap

> Living brainstorm of things worth building. Filter: **useful in 5 years.**
> Primary motivation (stated): **tools I'll use daily** — usefulness first.
> (These also happen to age best and impress recruiters as a side effect.)

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

## Idea backlog (not yet selected)

- LLM personal knowledge base with semantic search (RAG over own notes/docs).
- Email/calendar triage agent (extends Job Dashboard's classify pattern to all mail).
- Unified health hub: Apple Health + Strava + Gym Coach in one trend view.
- Adaptive training engine (the "brain" inside Gym Coach: periodization, deloads, readiness from sleep/HRV).

## How this feeds the portfolio

- Shipped modules → real Projects entries (replace placeholders).
- Sync engine + Agricola → the "distributed systems" depth story.
- Artem OS → the cohesive umbrella that ties scattered projects into ONE
  multi-year system narrative.
