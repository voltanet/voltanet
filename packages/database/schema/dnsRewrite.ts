import { relations } from "drizzle-orm";
import * as dz from "drizzle-orm/sqlite-core";
import { dnsUpstream } from "./dnsUpstream";
import { SharedColumns } from "./shared";

// ===== DNS Rewrite Table =====
export type $DNSRewriteSelect = typeof dnsRewrite.$inferSelect;
export type $DNSRewriteInsert = typeof dnsRewrite.$inferInsert;
export const dnsRewrite = dz.sqliteTable("dns_rewrite", {
  ...SharedColumns,
  name: dz.text("name").notNull(),
  enabled: dz.integer("enabled", { mode: "boolean" }).default(true).notNull(),
  domain: dz.text("domain").notNull(),
  destination: dz.text("destination").notNull(),
  type: dz.text("type", { enum: ["A", "CNAME"] }).notNull(),
  upstreamId: dz.text("upstream_id").references(() => dnsUpstream.id, { onDelete: "set null" }),
});

export const dnsRewriteRelations = relations(dnsRewrite, ({ one }) => ({
  upstream: one(dnsUpstream, {
    fields: [dnsRewrite.upstreamId],
    references: [dnsUpstream.id],
  }),
}));
