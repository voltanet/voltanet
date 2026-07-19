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
      <Stack gap={5}>
        <Group justify="space-between">
          <Group gap={15}>
            {props.withBack && (
              <ActionIcon variant="default" size="lg" onClick={() => history.back()}>
                <Iconify icon="@vite:solar:arrow-left-outline" />
              </ActionIcon>
            )}
            {props.icon && !props.withBack && (
              <ThemeIcon variant="light" size="lg">
                <Iconify icon={props.icon} />
              </ThemeIcon>
            )}
            <Title order={2} pt={5}>
              {props.label}
            </Title>
          </Group>
          {props.action}
        </Group>
        {props.description && <Text c="dimmed">{props.description}</Text>}
      </Stack>
      {props.children}
      <Stack h={60} />
    </Stack>
  );
};
