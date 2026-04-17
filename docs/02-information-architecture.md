# Information Architecture

Status: Draft
Last updated: 2026-04-17

## Route Map
- / (Home)
- /about (About)
- /projects (Projects)
- /blog (Blog index)
- /blog/[slug] (Blog detail)

## Home Section Anchors
- #who-i-am
- #projects
- #contact

## Page Roles
- Home: establish positioning and route visitors to Who I Am, Projects, Blog, and Contact
- About: background, skills, and trajectory
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
	- Anchor targets prepared: #who-i-am, #projects, #contact
2. Hero chunk
	- Positioning label
	- Primary headline
	- Supporting statement
	- Primary and secondary CTA targets
3. Who I Am chunk
	- Section heading
	- Intro paragraph
	- Supporting bullet points
	- Anchor support (#who-i-am)
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
	- Contact action placeholder or form entry point
	- Anchor support (#contact)
7. Navigation integration chunk
	- Home, Who I Am, Projects, Blog, About, Contact
	- Who I Am and Contact mapped to home anchors
	- Projects mapped to /projects
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
Top navigation: Home, Who I Am, Projects, Blog, About, Contact.
Navigation behavior: Who I Am and Contact point to section anchors on Home; Projects points to /projects.
In-page jump links on Home can use #who-i-am, #projects, and #contact.
Footer: social links, quick links (Home, Projects, Blog, Contact), and copyright.

## Category Model
- Tech
- Investing/Finance
- Lifestyle
- Philosophy
