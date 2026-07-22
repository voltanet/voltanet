import { Stack, Text, ThemeIcon } from "@mantine/core";
import { Iconify } from "./iconify";

export type $EmptyState = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  size?: number;
  icon?: string;
};

export const EmptyState = (props: $EmptyState) => {
  const size = props.size || 100;
  return (
    <Stack justify="center" align="center" gap={10} flex={1}>
      <ThemeIcon size={size} radius={50} variant="light">
        <Iconify width={size / 2} icon={props.icon || "@vite:iconamoon:box-light"} />
      </ThemeIcon>
      <Text ta="center" fz={size >= 100 ? "xl" : "md"} fw="bold">
        {props.title}
      </Text>
      {props.description && (
        <Text ta="center" fz="sm" c="dimmed">
          {props.description}
        </Text>
      )}
      {props.children}
    </Stack>
  );
};
