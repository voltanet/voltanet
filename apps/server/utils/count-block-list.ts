export const countBlockList = (content: string) => {
  const list = content
    // Split into lines
    .split(/\r\n|\n|\r/)
    // Clean up spaces and comments
    .map((line) => line.replace(/#.*$/, "").trim())
    // Filter out empty lines
    .filter((line) => line.length > 0);

  return list.length;
};
