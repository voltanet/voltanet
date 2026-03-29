import { blockListIdSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const deleteBlockListRoute = safeRoute
  .route({ method: "DELETE", tags: ["Block Lists"], path: "/block-list/delete" })
  .input(blockListIdSchema)
  // .errors({})
  .handler(async (c) => {});
