# Product Vision

Status: Draft
Last updated: 2026-04-17

## Purpose
Build a personal website that combines software portfolio credibility with a blog focused on Tech, Investing/Finance, Lifestyle, and Philosophy.

## Who I Am
Present a clear personal introduction that explains who Luiz Contes is, what he values, and how he approaches software, learning, and long-term thinking.
This section should build trust quickly and help visitors understand the person behind the work.

## Projects
Showcase selected projects that demonstrate practical execution, technical range, and problem-solving ability.
Each project entry should highlight context, decisions, outcomes, and links to source code or live demos when available.

## Information Architecture Alignment
The product vision is delivered through these core routes:
- / (Home)
- /about
- /projects
- /blog
- /blog/[slug]

## Homepage Section Flow
The Home page should present content in this order:
1. Hero and positioning
2. Who I Am
3. Projects
4. Recent posts
5. Contact call-to-action

## Navigation Intent
Top navigation should prioritize discoverability and conversion:
- Home, Who I Am, Projects, Blog, Contact
- Who I Am and Contact navigate to Home anchors
- Projects navigates to the dedicated /projects route

## Theme Preference
The site should support an accessible light/dark theme toggle so readers can choose their preferred reading mode.
Theme preference should persist between visits and fall back to system preference when no user choice exists.

## Language Preference
The site should support English, Brazilian Portuguese, and Spanish as primary languages.
A language switcher button should be placed immediately to the left of the dark/light theme toggle, following the same look and feel.
On first visit, the site should detect the visitor's preferred language from the browser (`navigator.language` / `Accept-Language`) and resolve to the closest supported locale, falling back to English when no match exists.
Language preference should persist in `localStorage` across visits and take precedence over browser detection on subsequent visits.
Switching language should navigate the user to the equivalent route in the selected locale when available, or gracefully fall back to the locale home page.
All language controls must be keyboard accessible and properly labeled for screen readers.

## Primary Goal
Convert interested readers into direct contacts through a focused contact section.

## Target Audience
- Recruiters and hiring managers
- Other developers and technical peers
- Readers interested in long-form thinking across tech and life

## Development Style
Mobile-first development is a core principle of this project. All layouts, components, and styles are designed for small screens first, then progressively enhanced for larger viewports. This ensures a fast, accessible, and usable experience regardless of device, and aligns with how the target audience consumes content on the go.

## Value Proposition
- Fast, static-first experience
- Mobile-first design ensuring full usability on any device
- Clear personal point of view
- Evidence of technical depth via blog content and implementation quality

## Success Signals
- Readers scroll through home page and reach contact section
- Visitors navigate from Home to Projects and Blog without friction
- Blog posts are discoverable and easy to skim
- Contact submissions or direct email outreach increase over time
