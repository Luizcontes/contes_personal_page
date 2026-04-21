# Component Strategy

Status: Draft
Last updated: 2026-04-17

## Architecture Intent
Components should support the IA flow and conversion path:
Hero -> Who I Am -> Projects -> Recent Posts -> Contact.
Projects must be usable both as a home teaser section and as a standalone /projects page.

## Hero Section
Build with static HTML and CSS for immediate rendering and strong first impression.

## Who I Am Page
Implemented as a dedicated `/who-i-am` route with a placeholder section.
The hero CTA on Home links directly to `/who-i-am`.
This is NOT a home page anchor section — it is a standalone page.

## Projects Layer
Use a reusable project card component for consistency across Home and /projects.
Home should show a curated subset (teaser), while /projects shows the complete set.
Each project card should include title, short summary, stack, and primary link.

## Content Layer
Use getCollection to surface latest 3 posts on home page for credibility and recency.

## Contact
Contact is handled via a `mailto:` link, not a contact form.
`SendEmailButton` renders an `<a>` tag with a locale-aware `mailto:` href including pre-filled subject and body.
The button appears in the hero actions area and in the footer.
No form backend, no client-side hydration, and no form validation are needed.

## Core Components
- Navigation (PrimaryNav)
- LanguagePicker
- ThemeToggle
- Footer
- Header
- ContentSection (generic section wrapper with heading, optional body copy, and CTA link)
- SendEmailButton (mailto: link styled as a button)
- Hero (inline in index.astro)
- WhoIAmSection (planned — /who-i-am page)
- ProjectCard (planned)
- ProjectsSection — Home teaser (planned)
- ProjectsGridPage — /projects (planned)
- Blog card (planned)

## Stylesheet Architecture
Each component and layout owns its dedicated CSS file located in the same folder as the `.astro` component.

### Stylesheet Pattern
- **Component CSS:** Create a `component-name.css` file in the same directory as the `.astro` component.
- **Import at top:** Import the stylesheet at the top of the `.astro` file with `import './component-name.css'`.
- **Selector ownership:** All selectors for that component (base styles, states, responsive behaviors) live in the dedicated CSS file.
- **Token usage:** All stylesheets can reference tokens from `src/styles/global.css` via CSS variables (e.g., `var(--color-bg)`, `var(--space-4)`).
- **No naming conflicts:** Scoped class names within each component's CSS prevent style leakage and improve maintainability.

### Global Stylesheet Responsibilities
`src/styles/global.css` contains only:
- Design token definitions (color, spacing, radius, shadow, motion, typography)
- Theme-aware token overrides (`html[data-theme="dark"]` and `html[data-theme="light"]`)
- Base element styles (html, body, links)
- Shared utility classes (`.sr-only` for screen readers)
- Shared section wrapper styles (`.home-shell`, `.home-section`)

Component-specific styles are never defined in the global stylesheet.

### Examples
- `src/components/menu/primary-nav.css` owns `.nav-toggle`, `.nav-toggle-icon`, `.primary-nav`, `.primary-nav-list`
- `src/components/theme/theme-toggle.css` owns `.theme-toggle`, `.theme-icon`, `.theme-icon-sun`, `.theme-icon-moon`
- `src/layouts/header/header.css` owns `.site-header`, `.site-header-inner`, `.header-controls`
- `src/layouts/footer/footer.css` owns `.site-footer`

## Navigation and Routing Components
- Current nav links: Home (/), Projects (/#projects), Blog (/#blog).
- Planned additions: Who I Am (/who-i-am) and Contact (mailto: link).
- On Home, in-page jump links use #projects and #blog for fast access to those sections.

## Navigation Build Plan
1. Create a dedicated Navigation component with a data-driven item list.
2. Render semantic structure:
	- <header>
	- <nav aria-label="Primary">
	- list-based links
3. Implement mobile-first behavior:
	- collapsed menu on small screens
	- three-strip menu button icon for mobile toggle
	- expanded horizontal layout on md+ screens
4. Add route/anchor behavior:
	- / (Home)
	- /#projects
	- /#blog
	- /who-i-am (planned)
	- mailto: contact link (planned)
5. Add active-link and focus-visible states using design tokens.
6. Keep JS minimal and avoid hydration unless interaction cannot be done accessibly with static HTML/CSS.

### Navigation Acceptance Criteria
- All required links render and point to correct routes/anchors.
- Mobile toggle displays as three horizontal strips with an accessible text label.
- Mobile menu can be opened/closed and is keyboard accessible.
- Desktop nav is visible without interaction.
- Focus indicator is visible on all interactive elements.
- Build passes and nav tests pass.

## Theme Toggle Build Plan
1. Add a ThemeToggle control in the header area near navigation controls.
2. Resolve initial theme before paint using stored preference or system preference.
3. Persist user choice in localStorage.
4. Reflect state with accessible semantics (`aria-pressed` and label text).
5. Keep implementation framework-free and minimal JS.

### Theme Toggle Acceptance Criteria
- Toggle is reachable by keyboard and clearly labeled.
- Toggle updates active theme between light and dark.
- Preference persists across reloads.
- Initial render uses resolved preference without visible theme flash.
- Existing navigation behavior remains intact.

## Language Picker Build Plan
1. Add a LanguagePicker control in the header immediately to the left of the ThemeToggle.
2. Resolve initial locale before paint: check `localStorage` first, then `navigator.language`, then fall back to `en`.
3. Persist user locale choice in `localStorage`.
4. On locale switch, update `localStorage`, `html[lang]`, and re-apply `data-i18n` translations client-side.
5. Reflect current locale state with accessible semantics (`aria-label`, current locale indicator).
6. Match ThemeToggle look and feel exactly: same size, shape, spacing, hover/focus/active states, and motion tokens.
7. Keep implementation framework-free and minimal JS.

### Language Picker Acceptance Criteria
- Control is reachable by keyboard and clearly labeled with current locale.
- Switching locale updates `localStorage`, `html[lang]`, and visible UI strings without page navigation.
- Locale preference persists across reloads via `localStorage`.
- On first visit, locale is resolved from browser language (`navigator.language`) falling back to `en`.
- Control visually matches the ThemeToggle in size, shape, and interaction states.
- No layout shift or flash of wrong locale on initial render.
- Existing navigation and theme behavior remain intact.

## Section Mapping by Route
- / : Hero, Projects shell, Blog shell (Who I Am, Recent Posts, Contact CTA planned).
- /who-i-am : Personal background and trajectory (placeholder page).
- /projects : Full projects grid and optional category/filter controls (placeholder page).
- /blog : Blog listing (placeholder page).
- /blog/[slug] : Blog detail.

## Home Incremental Delivery Order
To keep implementation small, testable, and approval-gated, Home should be delivered in this order:
1. Page shell and anchor skeleton (done: #hero, #projects, #blog)
2. Hero (done: headline, eyebrow, support paragraphs, mailto CTA, Who I Am CTA, hero image)
3. Projects teaser shell (done: ContentSection placeholder)
4. Recent posts shell (done: ContentSection placeholder)
5. Who I Am section (planned)
6. Contact CTA section (planned)
7. Navigation integration (in progress: Home, Projects, Blog in nav)
8. Footer integration (in progress: tagline + SendEmailButton)

## Performance Guidelines
- Keep non-critical interactivity deferred
- Prefer static components for above-the-fold content
- Keep icon usage tree-shaken
- Keep Home sections static-first; only hydrate interactive controls when required.
