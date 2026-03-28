import { createBlockListSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Block Lists"] })
  .input(createBlockListSchema)
  // .errors({})
  .handler(async (c) => {});
