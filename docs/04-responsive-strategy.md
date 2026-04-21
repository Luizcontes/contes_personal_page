# Responsive Strategy

Status: Draft
Last updated: 2026-04-17

## Core Principle
Design mobile-first, then progressively enhance for larger screens.
Target baseline is a 6-inch mobile screen. Complexity is layered at each breakpoint above it.

## Breakpoints
Using custom CSS with standard mobile-first breakpoints (no Tailwind — all styles are plain CSS with CSS variables):

| Name | Min-width | Primary use |
|------|-----------|-------------|
| (default) | 0px | Mobile base layout |
| sm | 640px | Comfortable mobile landscape |
| md | 768px | Tablet, two-column opportunities |
| lg | 1024px | Desktop, denser composition |
| xl | 1280px | Wide desktop, max-width containers |

## Fluid Typography Scale
Use clamp() for all heading and body sizes so text scales naturally without breakpoint jumps.

| Token | Mobile | Desktop | Formula |
|-------|--------|---------|---------|
| text-xs | 0.75rem | 0.875rem | clamp(0.75rem, 1.5vw, 0.875rem) |
| text-sm | 0.875rem | 1rem | clamp(0.875rem, 1.8vw, 1rem) |
| text-base | 1rem | 1.125rem | clamp(1rem, 2vw, 1.125rem) |
| text-lg | 1.125rem | 1.25rem | clamp(1.125rem, 2.2vw, 1.25rem) |
| text-xl | 1.25rem | 1.5rem | clamp(1.25rem, 2.5vw, 1.5rem) |
| text-2xl | 1.5rem | 2rem | clamp(1.5rem, 3vw, 2rem) |
| text-3xl | 1.875rem | 2.5rem | clamp(1.875rem, 4vw, 2.5rem) |
| text-4xl | 2.25rem | 3.5rem | clamp(2.25rem, 5vw, 3.5rem) |

## Container and Spacing
- Max content width: 1280px, centered with horizontal padding.
- Section vertical padding: space-12 on mobile, space-16 on desktop.
- Content column horizontal padding: space-4 on mobile, space-8 on desktop.
- Section inner max-width: 768px for prose-heavy sections (blog, about, who-i-am).

## Layout Behavior

### Navigation
- Mobile: hamburger menu or collapsible drawer.
- Tablet+: horizontal top nav with full link labels.
- Active link uses cyan accent underline or highlight.

### Hero Section
- Mobile: stacked headline + subheadline + CTA button, full width.
- Desktop: optional side-by-side layout if image or visual element is added later.

### Who I Am Section
- Mobile: stacked, prose-first, single column.
- Desktop: optional two-column layout (text + visual) if content warrants it.

### Projects Section (Home Teaser)
- Mobile: single column card stack.
- Tablet: two-column card grid.
- Desktop: two or three-column card grid depending on card density.

### Projects Page (/projects)
- Mobile: single column list.
- Tablet: two-column grid.
- Desktop: three-column grid with optional filter controls above.

### Blog Listing
- Mobile: single column card stack.
- Tablet+: two-column grid.

### Blog Detail
- Mobile: full-width single column, large readable type.
- Desktop: constrained prose column (max 72ch) centered, optional TOC or sidebar.

### About Page
- Mobile: stacked single column.
- Desktop: optional two-section layout (bio + skills/timeline).

### Contact Section
- Mobile: stacked full-width form.
- Desktop: centered narrow form (max-width 560px) for focused conversion.

## Performance Rules
- Avoid loading interactive JavaScript above the fold.
- Images should use width and height attributes to prevent layout shift.
- Keep mobile initial render free of layout-blocking resources.

## Validation Checklist
- [ ] All core sections render correctly on 375px, 768px, and 1280px.
- [ ] No horizontal scroll on any breakpoint.
- [ ] Fluid typography scales visually between mobile and desktop.
- [ ] Navigation is usable and accessible at all breakpoints.
- [ ] Projects grid transitions cleanly between 1, 2, and 3 columns.
- [ ] Blog detail prose is readable at mobile base and desktop max-width.
