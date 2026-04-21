import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    stack: z.array(z.string()),
    featured: z.boolean(),
    draft: z.boolean().default(false),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    year: z.number().int().optional(),
    status: z.enum(['planned', 'active', 'completed']).default('planned'),
  }),
});

export const collections = {
  blog,
  projects,
};
