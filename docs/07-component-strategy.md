# Component Strategy

Status: Draft
Last updated: 2026-04-16

## Hero Section
Build with static HTML and CSS for immediate rendering and strong first impression.

## Content Layer
Use getCollection to surface latest 3 posts on home page for credibility and recency.

## Contact Form Island
Use Astro island hydration with client:visible.
This delays form JavaScript until the section enters viewport.

## Core Components
- Navigation
- Footer
- Hero
- Blog card
- Contact form

## Performance Guidelines
- Keep non-critical interactivity deferred
- Prefer static components for above-the-fold content
- Keep icon usage tree-shaken
