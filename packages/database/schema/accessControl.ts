import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { proxyHost } from "./proxyHost";
import { SharedColumns } from "./shared";

// ===== Access Control Table =====
export type $AccessControlSelect = typeof accessControl.$inferSelect;
export type $AccessControlInsert = typeof accessControl.$inferInsert;
export const accessControl = dz.sqliteTable("access_control", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  rule: dz.text("rule", { enum: ["allow", "deny"] }).notNull(),
  exceptions: dz.text("exceptions", { mode: "json" }).$type<string[]>().default([]).notNull(),
  satisfy: dz
    .text("satisfy", { enum: ["all", "any"] })
    .default("all")
    .notNull(),
  credentials: dz
    .text("credentials", { mode: "json" })
    .$type<{ username: string; password: string }[]>()
    .default([])
    .notNull(),
});

export const accessControlRelations = relations(accessControl, ({ many }) => ({
  proxyHosts: many(proxyHost),
}));
