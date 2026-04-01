import { ActionIcon, AppShell, Group, ScrollAreaAutosize, Stack, Text } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { CONFIG, PAGES } from "@/features/const";
import { Iconify } from "../ui/iconify";
import { NavItem } from "./nav-item";

export const useNavBarOpened = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [opened, setOpened] = useLocalStorage({ key: "navbar-opened", defaultValue: true });

  useEffect(() => {
    if (isMobile) setOpened(false);
  }, [pathname, isMobile]);

  return [Boolean(opened), (value: boolean) => setOpened(value)] as const;
};

export const Header = () => {
  const [opened, setOpened] = useNavBarOpened();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const icon = `mdi:menu-${(isMobile ? opened : !opened) ? "open" : "close"}`;

  return (
    <>
      <AppShell.Header>
        <Group h="100%" justify="space-between" px={20}>
          <Group gap={10} align="center">
            <ActionIcon size={35} variant="default" onClick={() => setOpened(!opened)}>
              <Iconify height={25} icon={icon} />
            </ActionIcon>
            <Text component={Link} c="text" to="/" fz={25} fw="bold">
              {CONFIG.title}
            </Text>
          </Group>
          <Group gap={10} align="center">
            {/* o */}
          </Group>
        </Group>
      </AppShell.Header>
      {/* ============================== */}
      <AppShell.Navbar p={20}>
        <ScrollAreaAutosize scrollbars={false}>
          <Stack gap={10}>
            {PAGES.map((link, index) => (
              <NavItem key={index} {...link} />
            ))}
          </Stack>
        </ScrollAreaAutosize>
      </AppShell.Navbar>
    </>
  );
};
