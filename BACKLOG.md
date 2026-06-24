# Portfolio — Polish Backlog ("bells & whistles")

Live at https://artem-zagaynov.vercel.app — v1 skeleton is up. This is the list
to take it from "functional" to "polished product." Grouped by priority.

## P0 — Core interactions that are missing

- [ ] **Clickable timeline entries** → open a detail view (modal or dedicated
      page) with the full story: responsibilities, achievements, longer write-up,
      links. Right now entries are static text. *(Artem flagged this.)*
- [ ] **Mobile nav** — the header links almost certainly overflow/crowd on
      phones. Needs a hamburger menu + drawer under ~640px.
- [ ] **Contact form actually sends** — currently a `mailto:` form (clunky, opens
      mail client, unreliable). Wire a real provider (Formspree / Web3Forms /
      Resend) so messages actually arrive, with success/error states.
- [ ] **Project detail pages: real links** — repo/demo buttons exist but most
      point to a placeholder GitHub profile. Add real repo/demo URLs (or hide the
      button when there isn't one).

## P1 — Polish that makes it feel professional

- [ ] **Scroll-reveal animations** — subtle fade/slide-in as sections enter view
      (IntersectionObserver, reduced-motion safe). Makes it feel alive.
- [ ] **Active-section highlight** on long pages.
- [ ] **Hover/focus states audit** — consistent, snappy transitions on every
      interactive element (cards, buttons, links, nav).
- [ ] **Hero spacing** — tighten the vertical centering (too much dead space
      above the avatar on tall viewports).
- [ ] **Theme toggle: smooth icon transition** + remember choice (already
      persists; verify the icon swaps without flash).
- [ ] **Loading/empty states** for the contact form.
- [ ] **404 page** — branded, with a link home.
- [ ] **Favicon + app icons** — currently the default Astro favicon. Make a real
      one (monogram "A" in the palette).

## P2 — Content depth & credibility

- [ ] **Real project screenshots** for Job Dashboard (the widget, the pipeline)
      instead of the flat SVG placeholder covers.
- [ ] **More real testimonials** as collected.
- [ ] **Downloadable resume** button (PDF, not the docx) — but scrub PII first.
- [ ] **"Now" / status line** — what I'm currently building (ties to in-progress
      projects).
- [ ] **Skills section** — group the resume's tech (languages, cloud/devops,
      testing, security) into a clean visual.

## P3 — Performance, SEO, a11y, infra

- [ ] **Lighthouse pass** — target ≥95 across Performance / SEO / Best-Practices /
      A11y. Verify the lazy Three.js doesn't hurt LCP.
- [ ] **Self-host the Inter font** (currently Google Fonts CDN → render-blocking
      + a third-party request). Improves perf + privacy.
- [ ] **Optimize images** — use Astro `<Image>` / responsive sizes; the headshot
      is fine but formalize it.
- [ ] **Accessibility audit** — focus order, ARIA on the nav/toggle, color
      contrast in BOTH themes, alt text everywhere, keyboard-only pass.
- [ ] **Custom domain** — buy artemzagaynov.com / .dev, point at Vercel, update
      `site:` in astro.config. *(Cheapest credibility upgrade before sharing.)*
- [x] **Security headers** — `vercel.json` adds CSP, HSTS, X-Frame-Options,
      nosniff, Referrer-Policy, Permissions-Policy. Applies on Vercel deploy.
- [ ] **Cover images for new projects** — meos, web-scraper, solar-system,
      digital-po-box render coverless for now (degrade gracefully). Add covers in
      `/public/projects/`; a MeOS network-graph screenshot + Solar-system render
      are the strongest visuals.
- [ ] **Analytics** (privacy-friendly: Vercel Analytics or Plausible).
- [ ] **OG image** — ✅ done (public/og.png). Verify preview renders after deploy.

## P4 — Nice-to-have / future

- [ ] **Blog / writing** (MDX) — even 2–3 posts signals communication skill.
- [ ] **"My Network" interactive graph** as a portfolio centerpiece (ties to the
      Artem OS idea; see IDEAS.md).
- [ ] **Dark/light screenshots in project case studies.**
- [ ] **Subtle page-transition animations** (Astro view transitions).
