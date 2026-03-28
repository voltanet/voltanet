import { z } from "zod";

const destinationSchema = z.object({
  protocol: z.enum(["http", "https"], "Invalid protocol").meta({ title: "Destination Protocol" }),
  hostname: z
    .string()
    .trim()
    .min(1, "Hostname is too short (min 1 character)")
    .max(255, "Hostname is too long (max 255 characters)")
    .meta({ title: "Destination Hostname" }),
  port: z
    .int("Invalid port number")
    .min(1, "Invalid port number (min 1)")
    .max(65535, "Invalid port number (max 65535)")
    .meta({ title: "Destination Port" }),
});

export type $CreateProxyHostSchema = z.infer<typeof createProxyHostSchema>;
export const createProxyHostSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name is too short (min 3 characters)")
      .max(50, "Name is too long (max 50 characters)")
      .nonempty("Name is required")
      .meta({ title: "Proxy Host Name" }),
    enabled: z.boolean().default(true).meta({ title: "Proxy Host Enabled" }),
    domains: z
      .array(z.string().trim())
      .refine((v) => v.every((t) => t.length >= 3), "All domains must be at least 3 characters")
      .refine((v) => v.every((t) => t.length <= 255), "All domains must be at most 255 characters")
      .nonempty("At least one domain is required")
      .meta({ title: "Proxy Host Domains" }),
    destination: destinationSchema.meta({ title: "Proxy Host Destination" }),
    forceHttps: z.boolean().default(false).meta({ title: "Proxy Host Force HTTPS" }),
    websocket: z.boolean().default(false).meta({ title: "Proxy Host WebSocket" }),
    isRedirect: z.boolean().default(false).meta({ title: "Proxy Host Redirect" }),
    redirectCode: z
      .enum(["301", "302", "307", "308"], "Invalid redirect code")
      .default("301")
      .meta({ title: "Proxy Host Redirect Code" }),
    config: z.string().trim().optional().meta({ title: "Proxy Host Config" }),
    accessControlId: z.string().optional().meta({ title: "Proxy Host Access Control ID" }),
    certificateId: z.string().optional().meta({ title: "Proxy Host Certificate ID" }),
  })
  .refine(
    (data) => {
      const keys = data.domains.map((d) => d.trim().toLowerCase());
      return new Set(keys).size === keys.length;
    },
    { message: "Duplicate domains found", path: ["domains"] },
  );

export type $UpdateProxyHostSchema = z.infer<typeof updateProxyHostSchema>;
export const updateProxyHostSchema = z.object({
  id: z.string().meta({ title: "Proxy Host ID" }),
  ...createProxyHostSchema.partial().shape,
});

export type $ProxyHostIdSchema = z.infer<typeof proxyHostIdSchema>;
export const proxyHostIdSchema = updateProxyHostSchema.pick({ id: true });
