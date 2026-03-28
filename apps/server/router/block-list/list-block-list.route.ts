import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listBlockListRoute = safeRoute
  .route({ method: "GET", tags: ["DNS Block Lists"] })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
