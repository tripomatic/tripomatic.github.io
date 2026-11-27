import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTION_IDS } from './lib/sections';
import { FEATURE_SLUGS } from './lib/links';

const platform = z.enum(['ios', 'android', 'web']);

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(90),
    description: z.string().min(40).max(400),
    section: z.enum(SECTION_IDS),
    order: z.number().int(),
    platforms: z.array(platform).min(1),
    tier: z.enum(['free', 'premium', 'ai']).default('free'),
    feature: z.enum(FEATURE_SLUGS).optional(),
    appVersion: z.string().regex(/^\d+\.\d+(\.\d+)?$/),
    updated: z.coerce.date(),
    popular: z.boolean().default(false),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
