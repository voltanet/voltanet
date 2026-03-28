import { safeRoute } from "@/router/base";

export const createBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Block Lists"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
