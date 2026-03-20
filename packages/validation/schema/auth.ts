import { z } from "zod";

export type $SignInSchema = z.infer<typeof signInSchema>;
export const signInSchema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});

export type $SignUpSchema = z.infer<typeof signUpSchema>;
export const signUpSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").nonempty("Name is required"),
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
});
