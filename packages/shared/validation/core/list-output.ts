import { z } from "zod";

export const listOutputSchema = <T>(item: z.ZodType<T>) =>
  z.object({
    total: z.number(),
    found: z.number(),
    items: z.array(item),
  });

export const metaSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
