import * as dz from "drizzle-orm/sqlite-core";

export const SharedColumns = {
  id: dz
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID().split("-")[0]),
  createdAt: dz
    .integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: dz
    .integer("updated_at", { mode: "timestamp" })
    .$onUpdateFn(() => new Date())
    .$defaultFn(() => new Date())
    .notNull(),
};
