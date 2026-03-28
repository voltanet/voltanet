import { z } from "zod";

export type $CreateUpstreamSchema = z.infer<typeof createUpstreamSchema>;
export const createUpstreamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required")
    .meta({ title: "DNS Upstream Name" }),
  enabled: z.boolean().default(true).meta({ title: "DNS Upstream Enabled" }),
  server: z
    .string()
    .trim()
    .min(3, "Server address is too short (min 3 characters)")
    .max(255, "Server address is too long (max 255 characters)")
    .nonempty("Server address is required")
    .meta({ title: "DNS Upstream Server Address" }),
  port: z
    .int("Invalid port number")
    .min(1, "Invalid port number (min 1)")
    .max(65535, "Invalid port number (max 65535)")
    .default(53)
    .meta({ title: "DNS Upstream Port" }),
});

export type $UpdateUpstreamSchema = z.infer<typeof updateUpstreamSchema>;
export const updateUpstreamSchema = z.object({
  id: z.string().meta({ title: "DNS Upstream ID" }),
  ...createUpstreamSchema.partial().shape,
});

export type $UpstreamIdSchema = z.infer<typeof upstreamIdSchema>;
export const upstreamIdSchema = updateUpstreamSchema.pick({ id: true });
