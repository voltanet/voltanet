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

export type $CreateDNSUpstreamSchema = z.infer<typeof createDNSUpstreamSchema>;
export const createDNSUpstreamSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  enabled: z.boolean().default(true),
  servers: z.array(servers).min(1, "At least one server is required"),
});

export type $UpdateDNSUpstreamSchema = z.infer<typeof updateDNSUpstreamSchema>;
export const updateDNSUpstreamSchema = z.object({
  id: z.string(),
  ...createDNSUpstreamSchema.partial().shape,
});

export type $DNSUpstreamIdSchema = z.infer<typeof dnsUpstreamIdSchema>;
export const dnsUpstreamIdSchema = z.object({ id: z.string() });
