import { version } from "@/../../package.json"; // Main repo version
import { publicRoute } from "@/router";

export const health = publicRoute
  // Server health status
  .route({ method: "GET", tags: ["Core"] })
  .handler(() => ({ ok: true, version }));
