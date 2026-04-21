# Implementation Roadmap

Status: Draft
Last updated: 2026-04-17

## Phase 0: Documentation Setup
Objective: lock decisions and avoid rework during coding.

Steps:
1. Review and align Product Vision, Information Architecture, and Component Strategy.
2. Confirm route map and navigation behavior:
	- /, /about, /projects, /blog, /blog/[slug]
	- Home anchors: #who-i-am, #projects, #contact
3. Resolve architecture-impacting decisions in Open Decisions:
	- contact backend
	- canonical domain
	- analytics at launch
4. Mark docs status for ready sections as In Review or Approved.

Exit criteria:
- IA and Product Vision are consistent.
- No blocking decision remains unresolved.

## Phase 1: Project Scaffold
Objective: establish a stable Astro baseline.

Steps:
1. Verify Astro config for GitHub Pages (`site` and `base`).
2. Validate project scripts: dev, build, preview.
3. Confirm content config file location and Astro 6 format.
4. Ensure folder structure exists:
	- src/pages
	- src/components
	- src/layouts
	- src/content
	- src/styles
5. Confirm CI workflow exists and passes on `main`.

Exit criteria:
- `npm run build` succeeds.
- CI build job succeeds.

## Phase 2: Theming and Layout
Objective: implement visual foundation and shared shell.

Steps:
1. Create global stylesheet with design tokens, base typography, and shared utilities.
2. Establish stylesheet architecture: each component and layout owns a dedicated CSS file in its folder, imported at the top of the `.astro` component.
3. Add layout shell for metadata, header, main content, and footer.
3. Build navigation component with final IA behavior:
	- Home, Projects, Blog (current)
	- Who I Am (/who-i-am) and Contact (mailto:) — planned additions
4. Add footer tagline and mailto contact button.
5. Verify responsive behavior for header and nav states.

### Next Focus Plan: Theme Toggle
Execution units:
1. Define theme contract tests (theme attribute, token maps, toggle semantics, persistence hooks).
2. Add theme token mappings for light and dark modes.
3. Add pre-paint theme bootstrap script in document head.
4. Add header theme toggle control with accessible state and label.
5. Persist preference and apply updates without breaking nav behavior.
6. Validate contrast and usability in both themes.

Approval checkpoints:
1. Contract and failing tests approved.
2. Token mapping approved.
3. Bootstrap script approved.
4. Toggle UI and accessibility approved.
5. Persistence behavior approved.
6. Final tests/build verification approved.

### Next Focus Plan: Internationalization and Language Control
Status: DONE (client-side implementation)

Approach: client-side only — no Astro built-in i18n routing, no locale-prefixed URL paths.

What was implemented:
1. i18n contract tests defined and passing.
2. No Astro i18n config — locale resolution is entirely runtime/client-side.
3. No locale page folders — all pages are at `src/pages/` root; a single set of pages serves all locales.
4. `src/i18n/ui.ts` with translation dictionaries for `en`, `pt-br`, `es` and `defaultLang = 'en'`.
5. `src/i18n/utils.ts` with `resolveLang`, `useTranslations`, and `getContactMailtoHref` helpers.
6. Pre-paint locale bootstrap script in `BaseLayout.astro` head: resolves `localStorage` → `navigator.language` → `'en'`; sets `html[lang]` and `html[data-i18n-ready]`.
7. LanguagePicker control in header immediately left of ThemeToggle — flag icons, accessible listbox pattern.
8. Locale preference persisted in `localStorage` under `locale-preference`.
9. On locale switch, `html[lang]`, `localStorage`, and all `data-i18n` elements updated in-place — no page navigation.
10. Anchor behavior (#projects, #blog) unaffected by locale switch.

### Next Focus Plan: Navigation Menu
Execution units:
1. Define navigation contract tests (links, targets, semantics).
2. Implement static nav shell in shared layout/header.
3. Implement three-strip mobile toggle button with accessible label.
4. Add mobile collapsible behavior and keyboard support.
5. Add desktop horizontal behavior at md+.
6. Add active/focus states using design tokens.
7. Validate anchor behavior for /#projects and /#blog from all routes.

Approval checkpoints:
1. Contract and failing tests approved.
2. Static shell approved.
3. Mobile behavior approved.
4. Desktop behavior approved.
5. Accessibility and active-state behavior approved.
6. Final tests/build verification approved.

Exit criteria:
- All core pages render through a shared layout.
- Navigation destinations match IA rules.

## Phase 3: Content System
Objective: establish typed content and blog route pipeline.

Steps:
1. Finalize blog collection schema fields and validation.
2. Add at least 3 starter posts across planned categories.
3. Implement `/blog` list page with post metadata and tags.
4. Implement `/blog/[slug]` dynamic route.
5. Add draft filtering behavior for production builds.
6. Validate route generation and links from Home and Blog pages.

Exit criteria:
- Blog index and detail pages are build-time generated.
- Posts are discoverable and correctly categorized.

## Phase 4: Home, About, and Projects Surfaces
Objective: build conversion-focused content surfaces aligned with IA.

Steps:
1. Build Home in granular chunks:
	- Page shell and anchor skeleton
	- Hero
	- Who I Am
	- Projects teaser shell
	- Recent posts shell
	- Contact CTA shell
	- Navigation integration
	- Footer integration
2. For each Home chunk, run approval-gated TDD loop:
	- Define chunk contract (markup, links, token usage)
	- Add failing tests
	- Implement minimum code to pass
	- Run tests and build
	- Pause for approval before the next chunk
3. Add section anchors for Home (`#hero`, `#projects`, `#blog`).
4. Build `/projects` page with full project grid/list.
5. Create reusable project card component used on Home and `/projects`.
6. Build `/who-i-am` page with biography, trajectory, and skills.
7. Validate internal linking between Home, Projects, Blog, and Who I Am.

Exit criteria:
- Home and Projects are aligned with IA and Product Vision.
- Navigation paths between key sections are frictionless.

## Phase 5: Contact and Conversion
Objective: complete contact conversion path.

Steps:
1. Add a prominent contact CTA section on Home.
2. Contact action is a `mailto:` link (already implemented in hero and footer via `SendEmailButton`).
3. Ensure the mailto link uses the locale-aware subject and body from `src/i18n/ui.ts`.
4. Confirm the contact flow is accessible and functional across all supported locales.
5. Test conversion path:
	- Home -> Contact CTA -> mailto: client opens

Exit criteria:
- Contact CTA is visible on Home.
- mailto: link opens with pre-filled subject and body.
- No form backend required.

## Phase 6: Deploy
Objective: publish reliably and validate production quality.

Steps:
1. Validate deployment workflow on latest action versions.
2. Confirm GitHub Pages source is GitHub Actions.
3. Deploy from `main` and verify published routes:
	- /
	- /who-i-am
	- /projects
	- /blog
4. Validate metadata and canonical settings in production.
5. Confirm sitemap and social metadata behavior.
6. Add post-deploy smoke checklist (critical links + 404 page).

Exit criteria:
- Production site is reachable and stable.
- Core routes and metadata pass manual checks.

## Phase 7: Stabilization and Iteration
Objective: improve quality and maintain momentum post-launch.

Steps:
1. Review Lighthouse and accessibility quick checks.
2. Fix highest-impact UX and SEO issues.
3. Prepare next content batch and project updates.
4. Move docs status from Draft to Approved where complete.

Exit criteria:
- Launch baseline is stable.
- Next iteration backlog is prioritized.

## Done Criteria
- Build passes without errors
- Core routes are functional: /, /about, /projects, /blog, /blog/[slug]
- Home anchors work: #who-i-am, #projects, #contact
- Sitemap and metadata are present and valid
- Contact path is working end-to-end
- Deployment workflow succeeds on `main`
