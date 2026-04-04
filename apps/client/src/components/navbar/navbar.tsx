import { AppShell, ScrollArea, Stack, Text } from "@mantine/core";
import { PAGES } from "@/features/const";
import { NavItem } from "./nav-item";

export const NavBar = () => {
  return (
    <AppShell.Navbar>
      <AppShell.Section component={ScrollArea} grow>
        {Object.keys(PAGES).map((key) => (
          <Stack key={key} gap={5} p={10}>
            <Text fz="sm" c="dimmed" ml={10}>
              {key}
            </Text>
            {PAGES[key].map((page) => (
              <NavItem key={page.to} {...page} />
            ))}
          </Stack>
        ))}
      </AppShell.Section>
    </AppShell.Navbar>
  );
};
