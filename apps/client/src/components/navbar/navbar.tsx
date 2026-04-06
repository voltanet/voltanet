import { AppShell, ScrollArea, Stack, Text } from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { PAGES, type Page, SETTINGS_PAGES } from "@/features/const";
import { NavItem } from "./nav-item";

export const NavBar = () => {
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith("/settings");
  const list = isSettings ? SETTINGS_PAGES : PAGES;

  return (
    <AppShell.Navbar left="auto">
      <AppShell.Section component={ScrollArea} grow>
        {Object.keys(list).map((key) => (
          <Stack key={key} gap={5} p={10}>
            <Text fz="sm" c="dimmed" ml={10}>
              {key}
            </Text>
            {(list[key as keyof typeof list] as Page[]).map((page) => (
              <NavItem key={page.to} {...page} />
            ))}
          </Stack>
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
