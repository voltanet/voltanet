import { z } from "zod";

export type $CreateCertificateSchema = z.infer<typeof createCertificateSchema>;
export const createCertificateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required"),
  cert: z.string().trim().nonempty("Certificate is required"),
  key: z.string().trim().nonempty("Private key is required"),
  expiresAt: z.coerce.date(),
});

export type $UpdateCertificateSchema = z.infer<typeof updateCertificateSchema>;
export const updateCertificateSchema = z.object({
  id: z.string(),
  ...createCertificateSchema.partial().shape,
});

export type $CertificateIdSchema = z.infer<typeof certificateIdSchema>;
export const certificateIdSchema = z.object({ id: z.string() });
