# SEO and Metadata

Status: Draft
Last updated: 2026-04-17

## Strategy
Leverage static site generation so crawlers receive full HTML content immediately.

## Route Coverage
Core routes that must have complete metadata:
- /
- /who-i-am
- /projects
- /blog
- /blog/[slug]

## Metadata Requirements
- Unique page title per route
- Concise meta description per route
- Canonical URL per page
- OpenGraph tags for social preview
- Twitter card tags

## Canonical and URL Rules
- Use a single canonical domain for all pages.
- Set canonical URLs with full absolute paths per route.
- Ensure Home section anchors (#who-i-am, #projects, #contact) do not produce competing canonicals; canonical remains the Home route.
- Keep trailing-slash behavior consistent across all canonical links.

## Per-Route Metadata Intent
- Home (/): brand positioning + primary conversion intent.
- Who I Am (/who-i-am): background, skills, and narrative context.
- Projects (/projects): portfolio credibility, technical decisions, outcomes.
- Blog index (/blog): topical authority and content discovery.
- Blog detail (/blog/[slug]): post-specific keywords, publish date, and share-ready social preview.

## Internal Linking Strategy
- Home links to Projects and Blog as primary expertise paths.
- Projects links to relevant blog posts where technical deep dives exist.
- Blog posts can link to related projects when applicable.
- Who I Am links to Projects, Blog, and Contact conversion entry points.
- Use descriptive anchor text; avoid generic "click here" links.

## Sitemap
Generate sitemap automatically using Astro sitemap integration.

## Social Metadata Rules
- Every route should have OpenGraph title, description, and URL.
- Provide a default OG image fallback and allow per-page overrides.
- Ensure Twitter card metadata is present and consistent with OG content.

## Blog SEO Rules
- Use meaningful post slugs
- Include publish date and description
- Keep heading structure consistent
- Keep one H1 per page and logical heading nesting
- Include related links to improve crawl depth and session flow

## Validation Checklist
- Source contains expected meta tags
- Sitemap contains published core routes including /projects
- No duplicate titles across core pages
- Canonical tags match production domain and route paths
- OpenGraph and Twitter tags are present on Home, Who I Am, Projects, Blog index, and Blog detail
- Internal links between Home, Projects, Blog, and Who I Am are functional
