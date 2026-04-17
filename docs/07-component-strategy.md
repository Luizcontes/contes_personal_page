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
