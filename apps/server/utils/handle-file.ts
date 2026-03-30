import path from "node:path";

export const handleFile = async (targetPath: string, input?: string | null) => {
  const file = Bun.file(path.resolve(process.cwd(), "data", targetPath));

  // Delete file
  if (input === null) {
    if (await file.exists()) await file.delete();
    return null;
  }

  // Handle input
  if (typeof input === "string") {
    // If input is a path
    if (input == `/api/${targetPath}`) return input;

    // If input is a value
    await file.write(input);
    return `/api/${targetPath}`;
  }
};
