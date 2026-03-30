import { updateAccessControlSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { safeRoute } from "@/router/base";

export const updateAccessControlRoute = safeRoute
  .route({ method: "PUT", tags: ["Access Control"], path: "/access-control/update" })
  .input(updateAccessControlSchema)
  .errors({ NOT_FOUND: { message: "Access control not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.accessControl.id, input.id);

    const exists = await db.query.accessControl.findFirst({ where });
    if (!exists) throw errors.NOT_FOUND();

    // Encrypt credentials passwords
    const credentials = input.credentials?.map(({ username, password }) => {
      const current = exists.credentials.find((c) => c.username === username);
      if (current) {
        // Existing credential, hash the password if provided
        const nextPass = password ? Bun.password.hashSync(password, "bcrypt") : current.password;
        return { username, password: nextPass };
      } else if (password) {
        // New credential, hash the password
        return { username, password: Bun.password.hashSync(password, "bcrypt") };
      } else {
        // New credential, no password, ignore
        return undefined;
      }
    });

    await db
      .update(schema.accessControl)
      .set({ ...input, credentials: credentials?.filter((c) => c !== undefined) })
      .where(where);

    return "Access control updated successfully";
  });
