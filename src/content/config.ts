import { z, defineCollection } from "astro:content";

const reviewCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    rating: z.number().optional(),
    tags: z.array(z.string()).optional(),
    date: z.string().optional(),
  }),
});

export const collections = {
  reviews: reviewCollection,
};
