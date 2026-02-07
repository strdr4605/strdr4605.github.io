import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    slug: z.string().optional(),
    description: z.string().nullable().optional(),
    draft: z.boolean().optional().default(false),
    starred: z.boolean().optional().default(false),
    banner: z.string().optional(),
  }),
});

export const collections = { posts };
