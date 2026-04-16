# Deployment and Operations

Status: Draft
Last updated: 2026-04-16

## Deployment Target
GitHub Pages via GitHub Actions workflow.

## Pipeline Outline
1. Checkout repository
2. Setup Node.js
3. Install dependencies
4. Run Astro build
5. Deploy generated static output to Pages

## Required Repository Settings
- Enable GitHub Pages source as GitHub Actions
- Ensure workflow permissions allow deployment

## Operational Checks
- Build succeeds on default branch
- Published site serves latest commit
- 404 behavior is acceptable for static host routing

## Future Ops Additions
- Add optional preview deploys for pull requests
- Add build status badge to repository
