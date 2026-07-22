import { Stack, Text, ThemeIcon } from "@mantine/core";
import { Iconify } from "./iconify";

export type $EmptyState = {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: string;
};

export const EmptyState = (props: $EmptyState) => {
  return (
    <Stack justify="center" align="center" gap={10} flex={1}>
      <ThemeIcon size={100} radius={50} variant="light">
        <Iconify width={50} icon={props.icon || "@vite:iconamoon:box-light"} />
      </ThemeIcon>
      <Text ta="center" fz="lg" fw="bold">
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
