import { blockListIdSchema } from "@repo/validation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { safeRoute } from "@/router/base";
import { countBlockList } from "@/utils/count-block-list";
import { handleFile } from "@/utils/handle-file";

export const syncBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["Block Lists"], path: "/block-list/sync" })
  .input(blockListIdSchema)
  .output(z.string())
  .errors({
    UNPROCESSABLE_CONTENT: { message: "Unable to fetch the block list content" },
    NOT_FOUND: { message: "Block list not found" },
  })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const where = eq(schema.blockList.id, input.id);

    return await db.transaction(async (trx) => {
      const exists = await trx.query.blockList.findFirst({ where });
      if (!exists) throw errors.NOT_FOUND();

      const filePath = `block-list/${exists.id}.txt`;

      if (exists.type === "url") {
        try {
          const text = await (await fetch(exists.value)).text();
          await handleFile(filePath, text);
          const count = countBlockList(text);
          await trx.update(schema.blockList).set({ count, lastSyncAt: new Date() }).where(where);
        } catch {
          throw errors.UNPROCESSABLE_CONTENT();
        }
      }

      return "Block list synced successfully";
    });
  });
