import { z } from "zod";

const credentialSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username is too short (min 3 characters)")
    .max(50, "Username is too long (max 50 characters)")
    .nonempty("Username is required")
    .meta({ title: "Credential Username" }),
  password: z
    .string()
    .min(8, "Password is too short (min 8 characters)")
    .max(255, "Password is too long (max 255 characters)")
    .nonempty("Password is required")
    .meta({ title: "Credential Password" }),
});

export type $CreateAccessControlSchema = z.infer<typeof createAccessControlSchema>;
export const createAccessControlSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name is too short (min 3 characters)")
      .max(50, "Name is too long (max 50 characters)")
      .nonempty("Name is required")
      .meta({ title: "Access Control Name" }),
    rule: z.enum(["allow", "deny"], "Invalid rule").meta({ title: "Access Control Rule" }),
    exceptions: z
      .array(z.string().trim())
      .refine((v) => v.every((t) => t.length >= 3), "All exceptions must be at least 3 characters")
      .refine((v) => v.every((t) => t.length <= 25), "All exceptions must be at most 25 characters")
      .default([])
      .meta({ title: "Access Control Exceptions" }),
    satisfy: z
      .enum(["all", "any"], "Invalid satisfy mode")
      .default("all")
      .meta({ title: "Access Control Satisfy" }),
    credentials: z
      .array(credentialSchema)
      .default([])
      .meta({ title: "Access Control Credentials" }),
  })
  .refine(
    (data) => {
      const keys = data.exceptions.map((e) => e.toLowerCase());
      return new Set(keys).size === keys.length;
    },
    { message: "Duplicate exceptions found", path: ["exceptions"] },
  )
  .refine(
    (data) => {
      const keys = data.credentials.map((c) => c.username.toLowerCase());
      return new Set(keys).size === keys.length;
    },
    { message: "Duplicate usernames found", path: ["credentials"] },
  );

export type $UpdateAccessControlSchema = z.infer<typeof updateAccessControlSchema>;
export const updateAccessControlSchema = z.object({
  id: z.string().meta({ title: "Access Control ID" }),
  ...createAccessControlSchema.partial().shape,
});

export type $AccessControlIdSchema = z.infer<typeof accessControlIdSchema>;
export const accessControlIdSchema = updateAccessControlSchema.pick({ id: true });
