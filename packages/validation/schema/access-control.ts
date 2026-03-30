import { z } from "zod";

const credentials = z.object({
  username: z
    .string()
    .trim()
    .lowercase()
    .min(3, "Username is too short (min 3 characters)")
    .max(50, "Username is too long (max 50 characters)")
    .nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password is too short (min 8 characters)")
    .max(255, "Password is too long (max 255 characters)")
    .nonempty("Password is required"),
});

export type $CreateAccessControlSchema = z.infer<typeof createAccessControlSchema>;
export const createAccessControlSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  rule: z.enum(["allow", "deny"], "Invalid rule"),
  exceptions: z
    .array(z.string().trim())
    .transform((v) => v.map((t) => t.toLowerCase()))
    .refine((v) => v.every((t) => t.length >= 3), "All exceptions must be at least 3 characters")
    .refine((v) => v.every((t) => t.length <= 25), "All exceptions must be at most 25 characters")
    .default([])
    .refine((v) => {
      const keys = v.map((e) => e);
      return new Set(keys).size === keys.length;
    }, "Duplicate exceptions found"),
  satisfy: z.enum(["all", "any"], "Invalid satisfy mode").default("all"),
  credentials: z
    .array(credentials)
    .default([])
    .refine((v) => {
      const keys = v.map((c) => c.username);
      return new Set(keys).size === keys.length;
    }, "Duplicate usernames found"),
});

const credentialsUpdate = z.object({
  username: credentials.shape.username,
  password: credentials.shape.password.optional(),
});

export type $UpdateAccessControlSchema = z.infer<typeof updateAccessControlSchema>;
export const updateAccessControlSchema = z.object({
  id: z.string(),
  ...createAccessControlSchema.partial().shape,
  credentials: z
    .array(credentialsUpdate)
    .refine((v) => {
      const keys = v.map((c) => c.username);
      return new Set(keys).size === keys.length;
    }, "Duplicate usernames found")
    .optional(),
});

export type $AccessControlIdSchema = z.infer<typeof accessControlIdSchema>;
export const accessControlIdSchema = z.object({ id: z.string() });
