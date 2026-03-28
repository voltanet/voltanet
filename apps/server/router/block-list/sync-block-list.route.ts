import { blockListIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const syncBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["DNS Block Lists"] })
  .input(blockListIdSchema)
  // .errors({})
  .handler(async (c) => {});
