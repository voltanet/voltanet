import { ActionIcon, Box, FileButton, Textarea, type TextareaProps } from "@mantine/core";
import { type UseUncontrolledOptions, useUncontrolled } from "@mantine/hooks";
import { Iconify } from "./iconify";

type $TextareaReader = TextareaProps & UseUncontrolledOptions<string>;

export const TextareaReader = (props: $TextareaReader) => {
  const [value, setValue] = useUncontrolled(props);

  const handleRead = (payload: File | null) => {
    if (!payload) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === "string") setValue(text);
    };
    reader.readAsText(payload);
  };

  return (
    <Box pos="relative">
      <Textarea
        rows={6}
        resize="vertical"
        {...props}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <FileButton onChange={handleRead}>
        {(props) => (
          <ActionIcon variant="light" {...props} pos="absolute" bottom={10} right={10}>
            <Iconify icon="@vite:solar:upload-bold" />
          </ActionIcon>
        )}
      </FileButton>
    </Box>
  );
};
