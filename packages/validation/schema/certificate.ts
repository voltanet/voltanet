import { z } from "zod";

export type $CreateCertificateSchema = z.infer<typeof createCertificateSchema>;
export const createCertificateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name is too short (min 3 characters)")
    .max(50, "Name is too long (max 50 characters)")
    .nonempty("Name is required")
    .meta({ title: "Certificate Name" }),
  cert: z.string().trim().nonempty("Certificate is required").meta({ title: "Certificate" }),
  key: z.string().trim().nonempty("Private key is required").meta({ title: "Private Key" }),
  expiresAt: z.coerce.date().meta({ title: "Certificate Expiry" }),
});

export type $UpdateCertificateSchema = z.infer<typeof updateCertificateSchema>;
export const updateCertificateSchema = z.object({
  id: z.string().meta({ title: "Certificate ID" }),
  ...createCertificateSchema.partial().shape,
});

export type $CertificateIdSchema = z.infer<typeof certificateIdSchema>;
export const certificateIdSchema = updateCertificateSchema.pick({ id: true });
