import { Group, Stack, ThemeIcon, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { CONFIG } from "@/features/const";
import { AppearanceSettings } from "@/features/settings";

export const Route = createFileRoute("/settings/appearance")({
  head: () => ({ meta: [{ title: `Appearance | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <Stack>
        <Group>
          <ThemeIcon size="lg" color="teal" variant="light">
            <Iconify height={20} icon="solar:laptop-minimalistic-bold" />
          </ThemeIcon>
          <Title order={3}>Appearance</Title>
        </Group>
        <AppearanceSettings />
      </Stack>
    );
  },
});
