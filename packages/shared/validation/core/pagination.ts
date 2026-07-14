import { z } from "zod";

export type $PaginationSchema = z.infer<typeof paginationSchema>;
export const paginationSchema = z.object({
  search: z.string().trim().optional(),
  direction: z.enum(["asc", "desc"], "Invalid sort direction").default("desc"),
  sort: z.enum(["name", "updatedAt", "createdAt"], "Invalid sort field").default("updatedAt"),
  page: z.coerce.number().min(1, "Page must be at least 1").default(1),
  limit: z.coerce
    .number()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit must be at most 100")
    .default(20),
});
