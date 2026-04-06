import { Group, Stack, ThemeIcon, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { CONFIG } from "@/features/const";
import { SecuritySettings } from "@/features/settings";

export const Route = createFileRoute("/settings/security")({
  head: () => ({ meta: [{ title: `Security | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <Stack>
        <Group>
          <ThemeIcon size="lg" color="teal" variant="light">
            <Iconify height={20} icon="solar:shield-bold" />
          </ThemeIcon>
          <Title order={3}>Security</Title>
        </Group>
        <SecuritySettings />
      </Stack>
    );
  },
});
