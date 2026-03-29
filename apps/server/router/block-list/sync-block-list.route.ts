import { blockListIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const syncBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["Block Lists"], path: "/block-list/sync" })
  .input(blockListIdSchema)
  // .errors({})
  .handler(async (c) => {});
