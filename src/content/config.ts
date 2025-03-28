import { z, defineCollection } from "astro:content";

const reviewCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    rating: z.number().optional(),
    date_read: z.string().optional(),
    number_of_pages: z.number().optional(),
  }).passthrough(), // ← allow unknown fields
});

export const collections = {
  reviews: reviewCollection,
};
