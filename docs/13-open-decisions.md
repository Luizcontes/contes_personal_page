# Open Decisions

Status: Draft
Last updated: 2026-04-17

## How To Use This File
- Every decision must be updated from PLACEHOLDER before implementation closes.
- Keep one source of truth here; do not duplicate final decisions in multiple docs.
- When a decision is finalized, add an entry to Decision Log.

## Blocking Decisions (Must Resolve Before Full Implementation)

1. Contact Form Backend
- Status: RESOLVED
- Final decision: No form backend. Contact is handled via a `mailto:` link with locale-aware pre-filled subject and body.
- Implementation: `SendEmailButton` component renders an `<a>` tag with `mailto:` href. Link appears in the hero actions and footer.
- Why this was chosen: Zero infrastructure cost, no third-party dependency, locale-aware via `src/i18n/utils.ts#getContactMailtoHref`.
- Validation: mailto link opens system email client with correct subject and body in all three locales.

2. Domain and Canonical URL
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: PLACEHOLDER - GitHub Pages default domain
- Options under evaluation:
	- Keep username.github.io path URL
	- Add custom domain
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Required for canonical tags, sitemap, and social metadata consistency.
- Implementation impact: Astro site config, SEO metadata, DNS setup, Pages settings.
- Validation plan: PLACEHOLDER - Canonical URL and sitemap route checks.

3. Analytics
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: PLACEHOLDER - No analytics at initial scaffold
- Options under evaluation:
	- No analytics at launch
	- Privacy-friendly analytics
	- Standard analytics with consent controls
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Affects performance, privacy posture, and script loading strategy.
- Implementation impact: Base layout scripts, consent UX, legal text, metrics reporting.
- Validation plan: PLACEHOLDER - Performance and privacy acceptance criteria.

4. Projects Data Source and Schema Ownership
- Status: RESOLVED
- Final decision: Astro content collection in repository (`src/content/projects`).
- Implementation: `src/content.config.ts` defines the `projects` collection with typed schema via Zod.
- Validation: Schema type-check passes on build.

5. Home Projects Teaser Policy
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Show featured subset only.
- Options under evaluation:
	- Fixed count (for example, 3)
	- Feature-flag driven selection
	- Most recent projects
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Controls homepage information density and conversion path.
- Implementation impact: Home query logic, card ordering rules, content governance.
- Validation plan: PLACEHOLDER - UX and clarity review.

6. Contact Route Strategy
- Status: RESOLVED
- Final decision: No dedicated `/contact` route. Contact is a mailto: link in the hero actions and in the footer via `SendEmailButton`.
- Implementation: `SendEmailButton` component is used in `index.astro` (hero) and `Footer.astro`.
- Validation: mailto link is reachable from hero and footer on all routes.

## Non-Blocking Decisions (Can Resolve Iteratively)

7. Social Links and Handle Naming
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Include GitHub and LinkedIn only.
- Options under evaluation:
	- GitHub + LinkedIn
	- Add X
	- Add additional platforms
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Affects footer/nav completeness and contact trust signals.
- Implementation impact: Footer component, metadata profiles, icon set.
- Validation plan: PLACEHOLDER - Link and profile correctness checks.

8. Initial Hero Copy
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Placeholder copy during implementation.
- Options under evaluation:
	- Portfolio-first messaging
	- Blog/insight-first messaging
	- Hybrid positioning
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Sets first impression and CTA clarity.
- Implementation impact: Hero section content, metadata alignment, conversion messaging.
- Validation plan: PLACEHOLDER - Readability and clarity review.

9. Launch Content Count
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Minimum 3 posts and 3 projects.
- Options under evaluation:
	- 3 posts minimum
	- 5+ posts for deeper launch credibility
	- Staggered publish after launch
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Influences launch quality and perceived depth.
- Implementation impact: Content backlog, QA effort, launch date confidence.
- Validation plan: PLACEHOLDER - Editorial readiness check.

10. Primary CTA Labeling
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: "Contact" as default CTA label.
- Options under evaluation:
	- Contact Me
	- Work With Me
	- Let's Talk
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Impacts click intent and conversion clarity.
- Implementation impact: Nav labels, button copy, section headings.
- Validation plan: PLACEHOLDER - CTA wording review.

11. PWA App Icons (192×192 and 512×512 PNG)
- Status: Open
- Owner: Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Using existing `favicon.svg` as fallback icon for PWA manifest.
- Options under evaluation:
	- Use SVG-only (works for standalone mode; Android install banner will not trigger)
	- Create 192×192 and 512×512 PNG exports from existing logo/avatar
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Without PNG icons at those sizes, the browser-native "Add to Home Screen" install prompt on Android will not appear. Standalone mode (hiding browser chrome) still works when the user manually adds the site, but discoverability is reduced.
- Implementation impact: `public/` folder (add icon files), `public/manifest.webmanifest` (icon array entries), `BaseLayout.astro` (`apple-touch-icon` link).
- Validation plan: Lighthouse PWA audit passes; install prompt appears on Android Chrome.

## Readiness Checklist
- [ ] All blocking decisions have final values (no PLACEHOLDER entries).
- [ ] Owners and target dates are assigned for remaining non-blocking decisions.
- [ ] Final decisions are reflected in IA, Component Strategy, SEO, and Roadmap docs.

## Decision Log
- 2026-04-16: Documentation-first implementation approved
