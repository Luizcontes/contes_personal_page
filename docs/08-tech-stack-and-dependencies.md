# Tech Stack and Dependencies

Status: Draft
Last updated: 2026-04-21

## Core Framework
- Astro 6.x for routing, rendering, and static builds

## Content
- Markdown for blog authoring and project entries (MDX not yet used)

## Styling
- Custom CSS with CSS variables for tokenized styling and theme control
- No Tailwind or CSS framework

## Icons
- Inline SVGs imported as raw strings (`?raw`) directly in Astro components
- Flag icons for language picker; sun/moon icons for theme toggle
- No icon library (lucide-astro or similar) is installed

## Testing
- Vitest for token contract and adoption checks in a TDD-style workflow

## SEO and Discovery
- No SEO package installed yet (astro-seo not used)
- No sitemap integration yet (@astrojs/sitemap not used)
- SEO meta tags to be added directly to BaseLayout or per-page heads

## Deployment Platform
- GitHub for source control
- GitHub Actions for automated build and deploy
- GitHub Pages for static hosting

## Email Forwarding
- Cloudflare Email Routing for contact@ domain forwarding
- Contact action in app is a `mailto:` link (no form backend)
