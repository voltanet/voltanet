import { Group, Stack, ThemeIcon, Title } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { CONFIG } from "@/features/const";
import { AccountSettings } from "@/features/settings";

export const Route = createFileRoute("/settings/account")({
  head: () => ({ meta: [{ title: `Account | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <Stack>
        <Group>
          <ThemeIcon size="lg" color="teal" variant="light">
            <Iconify height={20} icon="solar:user-bold" />
          </ThemeIcon>
          <Title order={3}>Account</Title>
        </Group>
        <AccountSettings />
      </Stack>
    );
  },
});
