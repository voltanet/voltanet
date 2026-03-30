import { createAccessControlSchema } from "@repo/validation";
import { safeRoute } from "@/router/base";

export const createAccessControlRoute = safeRoute
  .route({ method: "POST", tags: ["Access Control"], path: "/access-control/create" })
  .input(createAccessControlSchema)
  .handler(async ({ context, input }) => {
    const { db, schema } = context;

    // Encrypt credentials passwords
    const credentials = input.credentials.map(({ username, password }) => ({
      username,
      password: Bun.password.hashSync(password, "bcrypt"),
    }));

    await db.insert(schema.accessControl).values({ ...input, credentials });

    return "Access control created successfully";
  });
