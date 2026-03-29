import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["Block Lists"], path: "/block-list/list" })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
