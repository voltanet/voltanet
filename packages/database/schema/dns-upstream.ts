import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { dnsRewrite } from "./dns-rewrite";
import { SharedColumns } from "./shared";

// ===== DNS Upstream Table =====
export type $DNSUpstreamSelect = typeof dnsUpstream.$inferSelect;
export type $DNSUpstreamInsert = typeof dnsUpstream.$inferInsert;
export const dnsUpstream = dz.sqliteTable("dns_upstream", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  enabled: dz.integer("enabled", { mode: "boolean" }).default(true).notNull(),
  servers: dz
    .text("servers", { mode: "json" })
    .$type<{ server: string; port: number }[]>()
    .notNull(),
});

export const dnsUpstreamRelations = relations(dnsUpstream, ({ many }) => ({
  rewrites: many(dnsRewrite),
}));
