import { ActionIcon, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Iconify } from "@/components/iconify";

type $PageLayout = {
  label: string;
  description?: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  withBack?: boolean;
  icon?: string;
};

export const PageLayout = (props: $PageLayout) => {
  return (
    <Stack>
      <Group align="flex-start" mb={5}>
        <Stack flex={1} gap={10}>
          <Group gap={15}>
            {props.withBack && (
              <ActionIcon variant="default" size="lg" onClick={() => history.back()}>
                <Iconify width={20} icon="@vite:solar:arrow-left-outline" />
              </ActionIcon>
            )}
            {props.icon && !props.withBack && (
              <ThemeIcon variant="light" size="lg">
                <Iconify width={20} icon={props.icon} />
              </ThemeIcon>
            )}
            <Title order={2}>{props.label}</Title>
          </Group>
          {props.description && <Text c="dimmed">{props.description}</Text>}
        </Stack>
        {props.action}
      </Group>
      {props.children}
      <Stack h={60} />
    </Stack>
  );
};
