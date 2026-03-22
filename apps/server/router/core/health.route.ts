import { version } from "@/../../package.json"; // Main repo version
import { publicRoute } from "@/router";

export const health = publicRoute
  // Server health status
  .route({ method: "GET", tags: ["Core"] })
  .handler(async ({ context: { db } }) => {
    const health = await db.query.settings.findFirst({
      where: (table, { eq }) => eq(table.key, "health"),
      columns: { value: true },
    });

    const status = (health?.value as "online" | "maintenance") ?? "online";
    return { status, version };
  });
