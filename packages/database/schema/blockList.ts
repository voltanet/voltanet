import * as dz from "drizzle-orm/sqlite-core";
import { SharedColumns } from "./shared";

// ===== Block List Table =====
export type $BlockListSelect = typeof blockList.$inferSelect;
export type $BlockListInsert = typeof blockList.$inferInsert;
export const blockList = dz.sqliteTable("block_list", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  enabled: dz.integer("enabled", { mode: "boolean" }).default(true).notNull(),
  type: dz.text("type", { enum: ["text", "url"] }).notNull(),
  value: dz.text("value").notNull(),
  count: dz.integer("count").notNull(),
  lastSyncAt: dz
    .integer("last_sync_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});
