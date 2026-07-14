import { createBlockListSchema } from "@repo/shared/validation";
import { z } from "zod";
import { safeRoute } from "@/router/base";
import { countBlockList } from "@/utils/count-block-list";
import { handleFile } from "@/utils/handle-file";

export const createBlockListRoute = safeRoute
  .route({ method: "POST", tags: ["Block Lists"], path: "/block-list/create" })
  .input(createBlockListSchema)
  .output(z.string())
  .errors({ UNPROCESSABLE_CONTENT: { message: "Unable to fetch the block list content" } })
  .handler(async ({ context, input, errors }) => {
    const { db, schema } = context;
    const id = crypto.randomUUID().split("-")[0];
    const filePath = `block-list/${id}.txt`;
    let count = 0;

    if (input.type === "text") {
      await handleFile(filePath, input.value);
      count = countBlockList(input.value);
    } else {
      try {
        const text = await (await fetch(input.value)).text();
        await handleFile(filePath, text);
        count = countBlockList(text);
      } catch {
        throw errors.UNPROCESSABLE_CONTENT();
      }
    }

    await db.insert(schema.blockList).values({ ...input, id, count });

    return "Block list created successfully";
  });
