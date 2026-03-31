import { z } from "zod";

const servers = z.object({
  server: z
    .string()
    .trim()
    .min(3, "Server address is too short (min 3 characters)")
    .max(255, "Server address is too long (max 255 characters)")
    .nonempty("Server address is required"),
  port: z
    .int("Port number must be integer")
    .min(1, "Invalid port number (min 1)")
    .max(65535, "Invalid port number (max 65535)")
    .default(53),
});

export type $CreateUpstreamSchema = z.infer<typeof createUpstreamSchema>;
export const createUpstreamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  enabled: z.boolean().default(true),
  servers: z.array(servers).min(1, "At least one server is required"),
});

export type $UpdateUpstreamSchema = z.infer<typeof updateUpstreamSchema>;
export const updateUpstreamSchema = z.object({
  id: z.string(),
  ...createUpstreamSchema.partial().shape,
});

export type $UpstreamIdSchema = z.infer<typeof upstreamIdSchema>;
export const upstreamIdSchema = z.object({ id: z.string() });
