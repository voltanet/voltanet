import { blockListIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteBlockListRoute = safeRoute
  .route({ method: "DELETE", tags: ["DNS Block Lists"] })
  .input(blockListIdSchema)
  // .errors({})
  .handler(async (c) => {});
