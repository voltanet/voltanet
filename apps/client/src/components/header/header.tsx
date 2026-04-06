import { ActionIcon, AppShell, Group, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { CONFIG } from "@/features/const";
import { Iconify } from "../iconify";
import { useNavBar } from "../navbar";
import { ThemeSwitcher } from "../theme-switcher";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  const [opened, setOpened] = useNavBar();
  const icon = opened ? "solar:list-cross-minimalistic-bold" : "solar:list-bold";

  return (
    <AppShell.Header>
      <Group h={60} justify="space-between" px={20}>
        <Group gap={10} align="center">
          <ActionIcon
            onClick={() => setOpened(!opened)}
            children={<Iconify height={25} icon={icon} />}
            hiddenFrom="sm"
          />
          <Text component={Link} c="text" to="/" fz={25} fw="bold">
            {CONFIG.title}
          </Text>
        </Group>
        <Group gap={10} align="center">
          <ThemeSwitcher />
          <HeaderMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
