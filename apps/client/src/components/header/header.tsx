import { ActionIcon, AppShell, Container, Group, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { CONFIG } from "@/features/const";
import { Iconify } from "../iconify";
import { useNavBar } from "../navbar";
import { ThemeSwitcher } from "../theme-switcher";
import { HeaderMenu } from "./header-menu";

export const Header = () => {
  const [opened, setOpened] = useNavBar();
  const icon = opened ? "@vite:solar:list-cross-minimalistic-bold" : "@vite:solar:list-bold";

  return (
    <AppShell.Header>
      <Container size="lg" px={20}>
        <Group h={60} justify="space-between">
          <Group gap={10} align="center">
            <ActionIcon onClick={() => setOpened(!opened)}>
              <Iconify height={25} icon={icon} />
            </ActionIcon>
            <Text component={Link} c="text" to="/" fz={25} fw="bold">
              {CONFIG.title}
            </Text>
          </Group>
          <Group gap={10} align="center">
            <ThemeSwitcher />
            <HeaderMenu />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
};
