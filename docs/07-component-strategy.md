# Component Strategy

Status: Draft
Last updated: 2026-04-17

## Architecture Intent
Components should support the IA flow and conversion path:
Hero -> Who I Am -> Projects -> Recent Posts -> Contact.
Projects must be usable both as a home teaser section and as a standalone /projects page.

## Hero Section
Build with static HTML and CSS for immediate rendering and strong first impression.

## Who I Am Section
Implement as a static section on Home for fast load and immediate personal context.
This section should support anchor navigation via #who-i-am.

## Projects Layer
Use a reusable project card component for consistency across Home and /projects.
Home should show a curated subset (teaser), while /projects shows the complete set.
Each project card should include title, short summary, stack, and primary link.

## Content Layer
Use getCollection to surface latest 3 posts on home page for credibility and recency.

## Contact Form Island
Use Astro island hydration with client:visible.
This delays form JavaScript until the section enters viewport.

## Core Components
- Navigation
- LanguagePicker
- ThemeToggle
- Footer
- Hero
- WhoIAmSection
- ProjectCard
- ProjectsSection (Home teaser)
- ProjectsGridPage (/projects)
- Blog card
- Contact form

## Navigation and Routing Components
- Header navigation should include Home, Who I Am, Projects, Blog, Contact.
- Who I Am and Contact should route to home anchors (#who-i-am, #contact).
- Projects should route to /projects.
- On Home, optional in-page jump links can use #projects for fast access to the teaser section.

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
	- /, /projects, /blog, /#who-i-am, /#contact
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
4. On locale switch, navigate to the equivalent route in the selected locale using `astro:i18n` helpers; fall back to locale home if no equivalent route exists.
5. Reflect current locale state with accessible semantics (`aria-label`, current locale indicator).
6. Match ThemeToggle look and feel exactly: same size, shape, spacing, hover/focus/active states, and motion tokens.
7. Keep implementation framework-free and minimal JS.

### Language Picker Acceptance Criteria
- Control is reachable by keyboard and clearly labeled with current locale.
- Switching locale navigates to the equivalent page in the selected locale.
- Locale preference persists across reloads via `localStorage`.
- On first visit, locale is resolved from browser language (`navigator.language`) falling back to `en`.
- Control visually matches the ThemeToggle in size, shape, and interaction states.
- No layout shift or flash of wrong locale on initial render.
- Existing navigation and theme behavior remain intact.

## Section Mapping by Route
- / : Hero, Who I Am, Projects teaser, Recent posts, Contact.
- /projects : Full projects grid and optional category/filter controls.
- /blog : Blog listing.
- /blog/[slug] : Blog detail.
- /about : Personal background and trajectory.

## Home Incremental Delivery Order
To keep implementation small, testable, and approval-gated, Home should be delivered in this order:
1. Page shell and anchor skeleton
2. Hero
3. Who I Am
4. Projects teaser shell
5. Recent posts shell
6. Contact CTA shell
7. Navigation integration
8. Footer integration

Current first target: Page shell and anchor skeleton.

## Performance Guidelines
- Keep non-critical interactivity deferred
- Prefer static components for above-the-fold content
- Keep icon usage tree-shaken
- Keep Home sections static-first; only hydrate interactive controls when required.
