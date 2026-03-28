import { safeRoute } from "@/router/base";

export const updateBlockListRoute = safeRoute
  .route({ method: "PUT", tags: ["DNS Block Lists"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
