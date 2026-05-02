import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.string(),
  updatedDate: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

export const collections = {
  fustes: defineCollection({ type: 'content', schema: postSchema }),
  configuracions: defineCollection({ type: 'content', schema: postSchema }),
  guies: defineCollection({ type: 'content', schema: postSchema }),
  gomes: defineCollection({ type: 'content', schema: postSchema }),
  noticies: defineCollection({ type: 'content', schema: postSchema }),
};
