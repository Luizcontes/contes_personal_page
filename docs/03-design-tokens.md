# Design Tokens

Status: Draft
Last updated: 2026-04-17

## Token Source
Tailwind CSS v4 CSS-first theme tokens in global stylesheet.

## Color Tokens
- --color-bg: #0a0f1e
- --color-surface: #131929
- --color-border: #1e2d4a
- --color-accent-cyan: #22d3ee
- --color-accent-purple: #a78bfa
- --color-text: #e2e8f0
- --color-text-muted: #64748b

## Theme Model
- Theme state is controlled with `html[data-theme="dark"]` and `html[data-theme="light"]`.
- Role token names stay stable across themes; values change per theme.
- Default theme should be resolved before paint to avoid flash of incorrect theme.

## Dark Theme Color Mapping
- --color-bg: #0a0f1e
- --color-surface: #131929
- --color-border: #1e2d4a
- --color-accent-cyan: #22d3ee
- --color-accent-purple: #a78bfa
- --color-text: #e2e8f0
- --color-text-muted: #64748b

## Light Theme Color Mapping
- --color-bg: #f8fafc
- --color-surface: #ffffff
- --color-border: #cbd5e1
- --color-accent-cyan: #0e7490
- --color-accent-purple: #7c3aed
- --color-text: #0f172a
- --color-text-muted: #475569

## Typography Tokens
- --font-sans: Inter, sans-serif
- --font-size-nav: 1.0625rem

## Rules
- Keep high contrast between text and backgrounds.
- Use cyan for primary interactions and purple for secondary highlights.
- Limit accent overuse to preserve visual hierarchy.

## Header Utility Control Tokens
Language switcher and theme toggle are visually paired header utility controls and must share identical token usage:
- Same size: 2.5rem × 2.5rem touch target
- Same border radius: `--radius-pill` for circular shape
- Same spacing rhythm: `--space-2` gap between controls
- Same background: transparent default, `--color-surface` on hover
- Same border: none by default
- Same focus ring: `--color-accent-cyan` outline with `--shadow-glow-cyan`
- Same motion: opacity/transform transitions using `--duration-base` and `--ease-standard`
- Icon size: 1.25rem × 1.25rem SVG or text label using `--font-size-nav`

## Spacing Tokens
- --space-1: 0.25rem
- --space-2: 0.5rem
- --space-3: 0.75rem
- --space-4: 1rem
- --space-6: 1.5rem
- --space-8: 2rem
- --space-12: 3rem
- --space-16: 4rem

## Radius Tokens
- --radius-sm: 0.375rem
- --radius-md: 0.75rem
- --radius-lg: 1.25rem
- --radius-xl: 1.75rem
- --radius-pill: 9999px

## Elevation Tokens
- --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2)
- --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.22)
- --shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.28)
- --shadow-glow-cyan: 0 0 0 1px rgba(34, 211, 238, 0.2), 0 0 24px rgba(34, 211, 238, 0.18)
- --shadow-glow-purple: 0 0 0 1px rgba(167, 139, 250, 0.2), 0 0 24px rgba(167, 139, 250, 0.16)

## Motion Tokens
- --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)
- --duration-fast: 120ms
- --duration-base: 200ms
- --duration-slow: 320ms

All documented token groups are approved for development use.
