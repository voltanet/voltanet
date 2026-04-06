import { Card, NavLink, Stack, Title } from "@mantine/core";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { Logout } from "@/features/auth";
import { CONFIG, SETTINGS_LINKS, type SettingsLink } from "@/features/const";

export const Route = createFileRoute("/settings/")({
  head: () => ({ meta: [{ title: `Settings | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <Stack>
        <Title order={3}>General</Title>
        <SettingsList list={SETTINGS_LINKS.main} />
        <Title order={3} mt={10}>
          About
        </Title>
        <SettingsList list={SETTINGS_LINKS.about} />
        <Logout>
          <NavLink
            label="Logout"
            leftSection={<Iconify width={20} icon="solar:logout-3-bold" />}
            style={{ borderRadius: 10 }}
            variant="light"
            color="red"
            active
          />
        </Logout>
      </Stack>
    );
  },
});

const SettingsList = ({ list }: { list: SettingsLink[] }) => {
  return (
    <Card>
      <Stack gap={10}>
        {list.map(({ path, icon, ...rest }) => (
          <NavLink
            key={path}
            {...rest}
            leftSection={<Iconify width={25} icon={icon} />}
            rightSection={<Iconify width={20} icon="solar:alt-arrow-right-bold" />}
            style={{ borderRadius: 10 }}
            component={Link}
            variant="subtle"
            color="text"
            to={path}
            active
          />
        ))}
      </Stack>
    </Card>
  );
};
