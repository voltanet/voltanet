import { z } from "zod";

const baseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  enabled: z.boolean().default(true),
  type: z.enum(["text", "url"], "Invalid source type"),
  value: z
    .string()
    .trim()
    .min(3, "Value is too short (min 3 characters)")
    .nonempty("Value is required"),
});

export type $CreateBlockListSchema = z.infer<typeof createBlockListSchema>;
export const createBlockListSchema = baseSchema.refine(
  (data) => (data.type === "url" ? z.url().safeParse(data.value).success : true),
  { message: "Invalid URL value", path: ["value"] },
);

export type $UpdateBlockListSchema = z.infer<typeof updateBlockListSchema>;
export const updateBlockListSchema = z
  .object({
    id: z.string(),
    ...baseSchema.partial().shape,
  })
  .refine((data) => (data.type === "url" ? z.url().safeParse(data.value).success : true), {
    message: "Invalid URL value",
    path: ["value"],
  });

export type $BlockListIdSchema = z.infer<typeof blockListIdSchema>;
export const blockListIdSchema = z.object({ id: z.string() });
