import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { accessControl } from "./accessControl";
import { certificate } from "./certificate";
import { SharedColumns } from "./shared";

// ===== Proxy Host Table =====
export type $ProxyHostSelect = typeof proxyHost.$inferSelect;
export type $ProxyHostInsert = typeof proxyHost.$inferInsert;
export const proxyHost = dz.sqliteTable("proxy_host", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  enabled: dz.integer("enabled", { mode: "boolean" }).default(true).notNull(),
  domains: dz.text("domains", { mode: "json" }).$type<string[]>().notNull(),
  destination: dz
    .text("destination", { mode: "json" })
    .$type<{ protocol: "http" | "https"; hostname: string; port: number }>()
    .notNull(),
  forceHttps: dz.integer("force_https", { mode: "boolean" }).default(false).notNull(),
  websocket: dz.integer("websocket", { mode: "boolean" }).default(false).notNull(),
  config: dz.text("config"),
  accessControlId: dz
    .text("access_control_id")
    .references(() => accessControl.id, { onDelete: "set null" }),
  certificateId: dz
    .text("certificate_id")
    .references(() => certificate.id, { onDelete: "set null" }),
});

export const proxyHostRelations = relations(proxyHost, ({ one }) => ({
  accessControl: one(accessControl, {
    fields: [proxyHost.accessControlId],
    references: [accessControl.id],
  }),
  certificate: one(certificate, {
    fields: [proxyHost.certificateId],
    references: [certificate.id],
  }),
}));
