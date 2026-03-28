import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { proxyHost } from "./proxy-host";
import { SharedColumns } from "./shared";

// ===== Certificate Table =====
export type $CertificateSelect = typeof certificate.$inferSelect;
export type $CertificateInsert = typeof certificate.$inferInsert;
export const certificate = dz.sqliteTable("certificate", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  cert: dz.text("cert").notNull(),
  key: dz.text("key").notNull(),
  expiresAt: dz.integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const certificateRelations = relations(certificate, ({ many }) => ({
  proxyHosts: many(proxyHost),
}));
