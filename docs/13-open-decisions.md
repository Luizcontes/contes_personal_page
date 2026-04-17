# Open Decisions

Status: Draft
Last updated: 2026-04-17

## How To Use This File
- Every decision must be updated from PLACEHOLDER before implementation closes.
- Keep one source of truth here; do not duplicate final decisions in multiple docs.
- When a decision is finalized, add an entry to Decision Log.

## Blocking Decisions (Must Resolve Before Full Implementation)

1. Contact Form Backend
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: PLACEHOLDER - Not decided
- Options under evaluation:
	- Formspree
	- Custom API endpoint
	- Other provider
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Needed before implementing contact form behavior.
- Implementation impact: Contact component, validation flow, environment variables, deployment config.
- Validation plan: PLACEHOLDER - How success/failure is measured.

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
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Astro content collection in repository.
- Options under evaluation:
	- Keep project entries in `src/content/projects`
	- Move projects to external CMS/API
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Defines how `/projects` is populated and maintained.
- Implementation impact: Content model, page rendering, editorial workflow.
- Validation plan: PLACEHOLDER - Data update workflow test.

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
- Status: PLACEHOLDER - Open
- Owner: PLACEHOLDER - Unassigned
- Target decision date: PLACEHOLDER - YYYY-MM-DD
- Current assumption: Contact section on Home with anchor link.
- Options under evaluation:
	- Home section only (`/#contact`)
	- Dedicated `/contact` page + Home CTA
	- Hybrid model (section + page)
- Final decision: PLACEHOLDER - Not selected
- Why this decision matters: Affects navigation, conversion tracking, and SEO page structure.
- Implementation impact: Routing, nav behavior, metadata, form placement.
- Validation plan: PLACEHOLDER - Contact completion path test.

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

## Readiness Checklist
- [ ] All blocking decisions have final values (no PLACEHOLDER entries).
- [ ] Owners and target dates are assigned for remaining non-blocking decisions.
- [ ] Final decisions are reflected in IA, Component Strategy, SEO, and Roadmap docs.

## Decision Log
- 2026-04-16: Documentation-first implementation approved
