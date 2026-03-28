import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Controls"] })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
