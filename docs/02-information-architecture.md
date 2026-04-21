# Information Architecture

Status: Draft
Last updated: 2026-04-17

## Route Map
- / (Home)
- /who-i-am (Who I Am)
- /projects (Projects)
- /blog (Blog index)
- /blog/[slug] (Blog detail)

## Home Section Anchors
- #hero
- #projects
- #blog

Note: Who I Am is a dedicated page (/who-i-am), not a home section. The contact action is a mailto: link in the hero and footer, not a home anchor.

## Page Roles
- Home: establish positioning and route visitors to Who I Am, Projects, Blog, and Contact
- Who I Am: background, skills, and trajectory
- Projects: showcase selected projects with context, technical decisions, and outcomes
- Blog index: discover all published writing by tag
- Blog detail: full post reading experience with strong metadata

## Content Hierarchy
1. Hero and positioning
2. Who I Am
3. Projects
4. Recent posts as proof of expertise
5. Contact call-to-action

## Home Implementation Granularity

### Chunk Model (Small Delivery Units)
1. Page shell chunk
	- Main wrapper and section order
	- Shared container rhythm (spacing tokens)
	- Anchor targets prepared: #hero, #projects, #blog
2. Hero chunk
	- Positioning label
	- Primary headline
	- Supporting statement
	- Primary and secondary CTA targets
3. Who I Am chunk (dedicated /who-i-am page)
	- Section heading
	- Intro paragraph
	- Supporting bullet points
4. Projects teaser chunk
	- Section heading and intro
	- Curated subset/cards for Home
	- Link handoff to /projects
	- Anchor support (#projects)
5. Recent posts chunk
	- Latest 3 posts
	- Core metadata: title, description, date, tags
	- Link handoff to /blog
6. Contact CTA chunk
	- Conversion-focused copy
	- Mailto: contact link (no form — contact is handled via mailto:)
7. Navigation integration chunk
	- Home, Projects, Blog (Who I Am and Contact planned)
	- Projects mapped to /projects
	- Blog mapped to /blog
	- Who I Am CTA in hero maps to /who-i-am
8. Footer integration chunk
	- Quick links
	- Social placeholders
	- Copyright

### Recommended Home Delivery Order
1. Page shell and anchor skeleton
2. Hero
3. Who I Am
4. Projects teaser shell
5. Recent posts shell
6. Contact CTA shell
7. Navigation integration
8. Footer integration
9. Replace shells with real content/data hookups

### Validation Loop (TDD-Like)
For each chunk:
1. Define chunk-level contract (structure + links + token usage expectations)
2. Add failing tests for that contract
3. Implement minimum code to pass
4. Run tests and build
5. Pause for approval before next chunk

## Navigation Model
Top navigation (current): Home, Projects, Blog.
Top navigation (planned): add Who I Am (→ /who-i-am) and Contact (→ mailto: link) once those surfaces are complete.
Navigation behavior: Projects points to /projects.
Footer: tagline, mailto contact button (Send Email), quick links and copyright planned.

Note: Who I Am and Contact are NOT currently in the primary nav. Hero CTAs link to /who-i-am and the mailto: contact link directly.

## Locale Model
Supported locales: `en` (English, default), `pt-br` (Brazilian Portuguese), `es` (Spanish).
Locale resolution is handled entirely client-side at runtime:
- On first visit, browser language is detected via `navigator.language` and matched to a supported locale, falling back to `en`.
- Locale preference is stored in `localStorage` under the key `locale-preference` and takes precedence on subsequent visits.
- The `html[lang]` attribute is updated at runtime by the page bootstrap script in `BaseLayout.astro`.
- UI strings are translated via `data-i18n` attributes updated by `src/scripts/home-page.ts`.
- No Astro built-in i18n routing, no locale-prefixed URL paths, no `astro:i18n` helpers are used.

Translation helpers live in `src/i18n/`:
- `src/i18n/ui.ts`: translation dictionaries and `defaultLang`
- `src/i18n/utils.ts`: `resolveLang`, `useTranslations`, `getContactMailtoHref`
Anchor targets (#who-i-am, #projects, #contact) are preserved within each locale.
On first visit, the preferred locale is resolved from `navigator.language` falling back to `en`.
Locale preference is stored in `localStorage` and used on subsequent visits before routing resolves.

## Navigation Implementation Granularity

### Navigation Contract
1. Menu items: Home, Who I Am, Projects, Blog, Contact.
2. Link targets:
	- Home -> /
	- Who I Am -> /#who-i-am
	- Projects -> /projects
	- Blog -> /blog
	- Contact -> /#contact
3. Navigation is visible and usable on mobile and desktop.
4. Active state is present for route-based links and visually consistent with token rules.
5. Keyboard navigation and focus visibility are required.
6. Mobile nav toggle uses a three-strip icon (hamburger) with accessible text label.
7. Header utility controls (language switcher, theme toggle) are placed to the right of the nav area.
8. Language switcher sits immediately left of the theme toggle and shares the same visual style.

### Small Delivery Units
1. Data model unit
	- Single source of truth list of nav items and targets.
2. Static nav shell unit
	- Header wrapper, brand slot, and nav list structure.
3. Mobile interaction unit
	- Collapsible behavior for small screens.
4. Desktop layout unit
	- Horizontal layout and spacing on md+ breakpoints.
5. Active-state and accessibility unit
	- Current route state, focus styles, ARIA attributes.
6. Home-anchor behavior unit
	- Who I Am and Contact anchor behavior from non-home routes.

### TDD-Like Validation Loop
For each unit:
1. Define contract for markup, routing behavior, and token usage.
2. Add failing tests.
3. Implement minimum code to pass.
4. Run tests and build.
5. Pause for approval before next unit.

## Category Model
- Tech
- Investing/Finance
- Lifestyle
- Philosophy
