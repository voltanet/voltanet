import { createAccessControlSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createAccessControlRoute = safeRoute
  .route({ method: "POST", tags: ["Access Controls"] })
  .input(createAccessControlSchema)
  // .errors({})
  .handler(async (c) => {});
