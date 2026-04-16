# Responsive Strategy

Status: Draft
Last updated: 2026-04-16

## Core Principle
Design mobile-first, then progressively enhance for larger screens.

## Typography
Use fluid typography via clamp() so text scales smoothly across viewport sizes.

## Layout Behavior
- Mobile first for content stack and readability
- Tablet introduces wider spacing and two-column opportunities
- Desktop adds denser composition while preserving scanability

## Breakpoint Approach
Use Tailwind mobile-first breakpoints and layer complexity at larger sizes only where needed.

## Performance Consideration
Avoid loading interactive JavaScript above the fold unless required for first view tasks.
