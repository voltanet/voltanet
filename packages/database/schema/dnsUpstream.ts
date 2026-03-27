import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { dnsRewrite } from "./dnsRewrite";
import { SharedColumns } from "./shared";

// ===== DNS Upstream Table =====
export type $DNSUpstreamSelect = typeof dnsUpstream.$inferSelect;
export type $DNSUpstreamInsert = typeof dnsUpstream.$inferInsert;
export const dnsUpstream = dz.sqliteTable("dns_upstream", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  enabled: dz.integer("enabled", { mode: "boolean" }).default(true).notNull(),
  server: dz.text("server").notNull(),
  port: dz.integer("port").default(53).notNull(),
});

export const dnsUpstreamRelations = relations(dnsUpstream, ({ many }) => ({
  rewrites: many(dnsRewrite),
}));
