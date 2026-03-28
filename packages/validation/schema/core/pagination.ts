import { z } from "zod";

export type $PaginationSchema = z.infer<typeof paginationSchema>;
export const paginationSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").default(1).meta({ title: "Page Number" }),
  limit: z
    .number()
    .min(1, "Limit must be at least 1")
    .max(100, "Limit must be at most 100")
    .default(20)
    .meta({ title: "Page Limit" }),
  search: z.string().trim().optional().meta({ title: "Search Query" }),
  direction: z
    .enum(["asc", "desc"], "Invalid sort direction")
    .default("asc")
    .meta({ title: "Sort Direction" }),
  sort: z
    .enum(["updatedAt", "createdAt"], "Invalid sort field")
    .default("updatedAt")
    .meta({ title: "Sort Field" }),
});
