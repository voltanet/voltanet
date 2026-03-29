import { paginationSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const listAccessControlRoute = safeRoute
  .route({ method: "GET", tags: ["Access Control"], path: "/access-control/list" })
  .input(paginationSchema)
  // .errors({})
  .handler(async (c) => {});
