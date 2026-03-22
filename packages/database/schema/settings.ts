import * as dz from "drizzle-orm/sqlite-core";
import { SharedColumns } from "./shared";

// ===== Settings Table =====
export type $SettingsSelect = typeof settings.$inferSelect;
export type $SettingsInsert = typeof settings.$inferInsert;
export const settings = dz.sqliteTable(
  "settings",
  {
    ...SharedColumns,
    key: dz.text("key").unique().notNull(),
    value: dz.text("value").notNull(),
  },
  (table) => [dz.index("key").on(table.key)],
);
