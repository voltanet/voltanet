import { blockListIdSchema } from "@repo/shared/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";
import { handleFile } from "@/utils/handle-file";

export const deleteBlockListRoute = safeRoute
  .route({ method: "DELETE", tags: ["Block Lists"], path: "/block-list/delete" })
  .input(blockListIdSchema)
  .output(z.string())
  .errors({ NOT_FOUND: { message: "Block list not found" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.blockList.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.blockList.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      await handleFile(`block-list/${exists.id}.txt`, null);
      await trx.delete(schema.blockList).where(where);

      return "Block list deleted successfully";
    });
  });
