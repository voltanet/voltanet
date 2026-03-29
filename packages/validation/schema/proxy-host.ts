import { z } from "zod";

const destinationSchema = z.object({
  protocol: z.enum(["http", "https"], "Invalid protocol"),
  hostname: z
    .string()
    .trim()
    .min(1, "Hostname is too short (min 1 character)")
    .max(255, "Hostname is too long (max 255 characters)"),
  port: z
    .int("Port number must be integer")
    .min(1, "Invalid port number (min 1)")
    .max(65535, "Invalid port number (max 65535)"),
});

export type $CreateProxyHostSchema = z.infer<typeof createProxyHostSchema>;
export const createProxyHostSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  enabled: z.boolean().default(true),
  domains: z
    .array(z.string().trim())
    .refine((v) => v.every((t) => t.length >= 3), "All domains must be at least 3 characters")
    .refine((v) => v.every((t) => t.length <= 255), "All domains must be at most 255 characters")
    .nonempty("At least one domain is required")
    .refine((v) => {
      const keys = v.map((d) => d.trim().toLowerCase());
      return new Set(keys).size === keys.length;
    }, "Duplicate domains found"),
  destination: destinationSchema,
  forceHttps: z.boolean().default(false),
  websocket: z.boolean().default(false),
  isRedirect: z.boolean().default(false),
  redirectCode: z.enum(["301", "302", "307", "308"], "Invalid redirect code").default("301"),
  config: z.string().trim().nullish(),
  accessControlId: z.string().nullish(),
  certificateId: z.string().nullish(),
});

export type $UpdateProxyHostSchema = z.infer<typeof updateProxyHostSchema>;
export const updateProxyHostSchema = z.object({
  id: z.string(),
  ...createProxyHostSchema.partial().shape,
});

export type $ProxyHostIdSchema = z.infer<typeof proxyHostIdSchema>;
export const proxyHostIdSchema = z.object({ id: z.string() });
