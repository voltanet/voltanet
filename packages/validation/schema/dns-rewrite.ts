import { z } from "zod";

export type $CreateRewriteSchema = z.infer<typeof createRewriteSchema>;
export const createRewriteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required")
    .meta({ title: "DNS Rewrite Name" }),
  enabled: z.boolean().default(true).meta({ title: "DNS Rewrite Enabled" }),
  domain: z
    .string()
    .trim()
    .min(3, "Domain is too short (min 3 characters)")
    .max(255, "Domain is too long (max 255 characters)")
    .nonempty("Domain is required")
    .meta({ title: "DNS Rewrite Domain" }),
  destination: z
    .string()
    .trim()
    .min(3, "Destination is too short (min 3 characters)")
    .max(255, "Destination is too long (max 255 characters)")
    .nonempty("Destination is required")
    .meta({ title: "DNS Rewrite Destination" }),
  type: z.enum(["A", "CNAME"], "Invalid type").meta({ title: "DNS Rewrite Type" }),
  upstreamId: z.string().optional().meta({ title: "DNS Rewrite Upstream ID" }),
});

export type $UpdateRewriteSchema = z.infer<typeof updateRewriteSchema>;
export const updateRewriteSchema = z.object({
  id: z.string().meta({ title: "DNS Rewrite ID" }),
  ...createRewriteSchema.partial().shape,
});

export type $RewriteIdSchema = z.infer<typeof rewriteIdSchema>;
export const rewriteIdSchema = updateRewriteSchema.pick({ id: true });
