import { safeRoute } from "@/router/base";

export const createAccessControlRoute = safeRoute
  .route({ method: "POST", tags: ["Access Controls"] })
  // .input()
  // .errors({})
  .handler(async (c) => {});
