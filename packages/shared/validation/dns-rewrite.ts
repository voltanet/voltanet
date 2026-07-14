import { z } from "zod";

export type $CreateRewriteSchema = z.infer<typeof createRewriteSchema>;
export const createRewriteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  enabled: z.boolean().default(true),
  domain: z
    .string()
    .trim()
    .min(3, "Domain is too short (min 3 characters)")
    .max(255, "Domain is too long (max 255 characters)")
    .nonempty("Domain is required"),
  destination: z
    .string()
    .trim()
    .min(3, "Destination is too short (min 3 characters)")
    .max(255, "Destination is too long (max 255 characters)")
    .nonempty("Destination is required"),
  type: z.enum(["A", "CNAME"], "Invalid type"),
  upstreamId: z.string().nullish(),
});

export type $UpdateRewriteSchema = z.infer<typeof updateRewriteSchema>;
export const updateRewriteSchema = z.object({
  id: z.string(),
  ...createRewriteSchema.partial().shape,
});

export type $RewriteIdSchema = z.infer<typeof rewriteIdSchema>;
export const rewriteIdSchema = z.object({ id: z.string() });
