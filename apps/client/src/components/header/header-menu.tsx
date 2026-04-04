import { ActionIcon, Anchor, Avatar, Group, Menu, Stack, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { auth } from "@/features/auth";
import { Iconify } from "../iconify";
import { ShortcutsToggle } from "../shortcuts";

export const HeaderMenu = () => {
  const { data: session } = auth.useSession();
  if (!session) return null;

  return (
    <Menu position="top-start">
      <Menu.Target>
        <ActionIcon variant="default" size="lg">
          <Avatar src={session.user.image} name={session.user.name} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown miw={250}>
        <Group gap={10} p={10}>
          <Avatar size={50} src={session.user.image} name={session.user.name} />
          <Stack gap={0} flex={1}>
            <Text lineClamp={1}>{session.user.name}</Text>
            <Text c="dimmed" fz="sm" lineClamp={1}>
              {session.user.email}
            </Text>
          </Stack>
        </Group>
        <Menu.Divider />
        <Anchor component={Link} to="/settings/account" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:user-outline" />}>
            Account
          </Menu.Item>
        </Anchor>
        <Anchor component={Link} to="/logs" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:history-outline" />}>
            Activity Logs
          </Menu.Item>
        </Anchor>
        <Anchor component={Link} to="/settings" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:settings-outline" />}>
            Settings
          </Menu.Item>
        </Anchor>
        <MoreInfoMenu />
        <Menu.Divider />
        <Menu.Item
          children="Sign Out"
          leftSection={<Iconify width={20} icon="solar:logout-3-outline" />}
          color="red"
        />
      </Menu.Dropdown>
    </Menu>
  );
};

const MoreInfoMenu = () => {
  return (
    <Menu.Sub position="bottom-end" offset={10} closeDelay={200}>
      <Menu.Sub.Target>
        <Menu.Sub.Item leftSection={<Iconify width={20} icon="solar:info-circle-outline" />}>
          More Info
        </Menu.Sub.Item>
      </Menu.Sub.Target>
      <Menu.Sub.Dropdown>
        <Anchor component={Link} to="/about" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:info-circle-outline" />}>
            About
          </Menu.Item>
        </Anchor>
        <Menu.Divider />
        <ShortcutsToggle />
        <Anchor href="https://voltanet.github.io" target="_blank" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:book-outline" />}>
            Documentation
          </Menu.Item>
        </Anchor>
        <Anchor href="https://github.com/voltanet/voltanet" target="_blank" underline="never">
          <Menu.Item leftSection={<Iconify width={20} icon="solar:code-outline" />}>
            Source Code
          </Menu.Item>
        </Anchor>
      </Menu.Sub.Dropdown>
    </Menu.Sub>
  );
};
