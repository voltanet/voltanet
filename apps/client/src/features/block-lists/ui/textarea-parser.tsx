import { ActionIcon, Box, Textarea, type TextareaProps } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { Iconify } from "@/components/iconify";

const parseBlockList = (content: string) =>
  content
    .split(/\r\n|\n|\r/)
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter((line) => line.length > 0)
    .join("\n");

export type $TextareaParser = TextareaProps & UseUncontrolledOptions<string>;

export const TextareaParser = (props: $TextareaParser) => {
  const [value, setValue] = useUncontrolled(props);

  const bottom = props.error ? 30 : 10;

  const handleParse = () => {
    const next = typeof value === "string" ? parseBlockList(value) : "";
    setValue(next);
  };

  return (
    <Box pos="relative">
      <Textarea
        rows={6}
        resize="vertical"
        {...props}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <ActionIcon variant="light" pos="absolute" bottom={bottom} right={10} onClick={handleParse}>
        <Iconify icon="@vite:solar:magic-wand-3-bold" />
      </ActionIcon>
    </Box>
  );
};
