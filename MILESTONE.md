# Portfolio v1 — Milestone & Phases

**Owner:** Artem Zagaynov
**Repo:** github.com/SharkBoy289/Artems-Portfolio-Website (fresh start, history begins now)
**Stack:** Astro + MDX + content collections. TypeScript. Tailwind (utility-first, matches the existing dark aesthetic). Subtle lazy-loaded Three.js accent.

## North star

Rebuild the portfolio with the same confident design DNA as the previous Vercel version — dark, minimal, high-contrast, electric-blue accent with warm-amber hover — but **more polished, more complete, and content-honest**. v1 is the foundation we grow for years.

## Design DNA to keep (from the old site)

- Near-black canvas, white type, **blue (#2563eb) primary accent**, **amber active/hover**.
- 5-section IA: **Home → About Me → Projects → Timeline → Contact**.
- Hero = avatar + name + one-line value prop + single CTA ("See my work").
- About = intro + Services + "My Design Process" (Discover/Build/Launch) + Testimonials.
- Dark/light toggle (the moon icon).

## What to fix from the old version

- Broken project images (UI/UX, Data Visualizer, UX Research) → consistent, optimized images for every card.
- Emoji social icons rendering as tofu → real inline SVG icons.
- Sparse lower-half layouts → tighter spacing, alignment, vertical rhythm.
- Non-functional contact form → working submission (provider TBD) or graceful mailto fallback.

## Content authenticity (decided)

- **Testimonials are REAL** — Karina Mois, Max Harper, Challenge UCSC. Permission granted to use names. Keep & attribute as-is.
- **Projects / Timeline / Services were placeholders** — v1 ships with tasteful, clearly-swappable placeholder content; real projects get written up in a later pass (see "Make projects shareable" backlog item).
- No backdating of git history. No invented testimonials.

## Phases

### Phase 0 — Foundation
- Scaffold Astro (MDX, sitemap, Tailwind, TS strict).
- `.gitignore` incl. `.claude/`. First commit.
- Base layout, font loading, theme tokens (colors, spacing, type scale), dark/light toggle.

### Phase 1 — Structure & pages (static, placeholder content)
- Home/hero, About, Projects grid, Timeline, Contact — all wired with nav + routing.
- Content collections for `projects`, `timeline`, `testimonials` (MDX/JSON) so content edits never touch layout.

### Phase 2 — Polish & components
- Reusable cards, section headers, buttons. Fix all images (optimized `<Image>`), real SVG social icons.
- Responsive (mobile-first) + accessibility pass (focus states, alt text, contrast, keyboard nav).

### Phase 3 — Interactive accent
- ONE subtle Three.js (or lightweight canvas) hero accent. Lazy-loaded, static fallback, `prefers-reduced-motion` respected. Must not regress Lighthouse.

### Phase 4 — Real content + contact
- Wire real testimonials. Working contact form (provider decided) or mailto fallback.

### Phase 5 — Ship
- Lighthouse/SEO check (meta, OG tags, sitemap, robots). Pick host. Deploy. Push to origin.

## v1 Definition of Done

- [ ] All 5 pages built, responsive, accessible, dark/light toggle works.
- [ ] No broken images; real SVG icons.
- [ ] Real testimonials in place; everything else clearly-swappable placeholder.
- [ ] Lighthouse: Performance/SEO/Best-Practices/A11y all ≥ 95.
- [ ] Content lives in content collections (easy updates).
- [ ] Deployed live; pushed to GitHub origin.

## Backlog (post-v1)
- **Make each real project shareable & beautiful** (case studies, screenshots, live demos) — feeds the Projects grid & Timeline with real content.
- Blog (MDX) if desired. Analytics. More testimonials as collected.
