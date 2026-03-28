import { safeRoute } from "@/router/base";

export const updateAccessControlRoute = safeRoute
  .route({ method: "PUT", tags: ["Access Controls"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
