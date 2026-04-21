# Content Collections

Status: Draft
Last updated: 2026-04-17

## Strategy
Use Astro Content Collections with typed schemas to manage structured content for:
- Blog posts (drives /blog and /blog/[slug])
- Projects (drives /projects and Home teaser)

Blog posts support both `.md` and `.mdx` files. Use `.mdx` when a post needs embedded components (e.g. `<Image>`, YouTube iframes, custom callouts). Plain `.md` is preferred for text-only posts.

## Collection Structure
- src/content/blog (supports .md and .mdx)
- src/content/projects
- src/content.config.ts

## Blog Collection Schema

Required frontmatter:
- title: string
- description: string
- date: date
- tags: string[]

Optional frontmatter:
- draft: boolean (default false)
- cover: string
- ogImage: string

## Projects Collection Schema

Required frontmatter:
- title: string
- summary: string
- stack: string[]
- featured: boolean

Optional frontmatter:
- draft: boolean (default false)
- repoUrl: string
- liveUrl: string
- year: number
- status: string (planned | active | completed)

## Route Mapping
- /blog -> list published blog entries
- /blog/[slug] -> individual blog entry
- /projects -> list published project entries
- / (Home) -> featured project subset + latest blog subset

## Content Policy
- Every post must include clear tags from approved category list.
- Draft posts are excluded from production listing.
- Description should be concise and suitable for SEO snippets.
- Projects marked draft are excluded from /projects and Home teaser.
- Home should only show featured projects and latest published posts.

## Slug and Naming Rules
- Use kebab-case filenames for entries.
- Keep slugs stable once published.
- Avoid generic names (for example, post-1, project-final).

## Editorial Conventions
- Keep titles specific and searchable
- Keep opening paragraph skimmable
- Include practical takeaways when relevant

## Validation Checklist
- Content schema type-check passes.
- No required frontmatter fields are missing.
- Draft filtering works for blog and projects.
- /blog, /blog/[slug], and /projects render without empty-state errors.
- Home subset logic works (latest blog + featured projects).
