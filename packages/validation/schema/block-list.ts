import { z } from "zod";

export type $CreateBlockListSchema = z.infer<typeof createBlockListSchema>;
export const createBlockListSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name is too short (min 3 characters)")
      .max(50, "Name is too long (max 50 characters)")
      .nonempty("Name is required")
      .meta({ title: "Block List Name" }),
    enabled: z.boolean().default(true).meta({ title: "Block List Enabled" }),
    type: z.enum(["text", "url"], "Invalid source type").meta({ title: "Block List Source Type" }),
    value: z
      .string()
      .trim()
      .min(3, "Value is too short (min 3 characters)")
      .nonempty("Value is required")
      .meta({ title: "Block List URL/Text Value" }),
  })
  .refine((data) => (data.type === "url" ? z.url().safeParse(data.value).success : true), {
    message: "Invalid URL value",
    path: ["value"],
  });

export type $UpdateBlockListSchema = z.infer<typeof updateBlockListSchema>;
export const updateBlockListSchema = z.object({
  id: z.string().meta({ title: "Block List ID" }),
  ...createBlockListSchema.partial().shape,
});

export type $BlockListIdSchema = z.infer<typeof blockListIdSchema>;
export const blockListIdSchema = updateBlockListSchema.pick({ id: true });
