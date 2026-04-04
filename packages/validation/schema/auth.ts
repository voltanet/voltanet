import { z } from "zod";

export type $SignInSchema = z.infer<typeof signInSchema>;
export const signInSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});
