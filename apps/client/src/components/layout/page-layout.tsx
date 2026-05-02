import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { Iconify } from "@/components/iconify";

type $PageLayout = {
  icon: string;
  label: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
};

export const PageLayout = ({ icon, label, description, action, children }: $PageLayout) => {
  return (
    <Stack>
      <Group align="flex-start" mb={5}>
        <Stack flex={1} gap={10}>
          <Group gap={15}>
            <ThemeIcon size="lg" variant="light">
              <Iconify height={20} icon={icon} />
            </ThemeIcon>
            <Title order={2}>{label}</Title>
          </Group>
          {description && <Text c="dimmed">{description}</Text>}
        </Stack>
        {action}
      </Group>
      {children}
      <Stack h={60} />
    </Stack>
  );
};
