import { z } from "zod";

export type $UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password is supposed be at least 8 characters")
    .nonempty("Current password is required"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .nonempty("New password is required"),
  revokeOtherSessions: z.boolean().optional(),
});

export type $UpdateDetailsSchema = z.infer<typeof updateDetailsSchema>;
export const updateDetailsSchema = z.object({
  image: z.string().nullish(),
  name: z.string().trim().min(3, "Name must be at least 3 characters").optional(),
});

export type $UserIdSchema = z.infer<typeof userIdSchema>;
export const userIdSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});
