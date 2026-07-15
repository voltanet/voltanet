import {
  Divider,
  Group,
  Kbd,
  Menu,
  Modal,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { useNavigate } from "@tanstack/react-router";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { Fragment } from "react";
import { Iconify } from "./iconify";
import { useNavBar } from "./navbar";

const state = atom(false);

const Shortcut = ({ label, keys }: { label: string; keys: string[] }) => (
  <Group justify="space-between">
    <Text fz="sm">{label}</Text>
    <Group gap={10}>
      <Kbd>{keys[0]}</Kbd>
      <Text> + </Text>
      <Kbd>{keys[1]}</Kbd>
    </Group>
  </Group>
);

export const ShortcutsToggle = () => {
  const [opened, setOpened] = useAtom(state);

  return (
    <Menu.Item
      onClick={() => setOpened(!opened)}
      leftSection={<Iconify icon="@vite:solar:keyboard-bold" />}
    >
      Keyboard Shortcuts
    </Menu.Item>
  );
};

export const ShortcutsView = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useAtom(state);
  const [navbarOpened, setNavBarOpened] = useNavBar();
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([
    ["mod + /", () => setOpened(!opened)],
    ["mod + .", () => navigate({ to: "/settings" })],
    ["mod + b", () => setNavBarOpened(!navbarOpened)],
    ["mod + j", toggleColorScheme],
  ]);

  const shortcuts = [
    { label: "Toggle Theme", keys: ["⌘", "J"] },
    { label: "Toggle Navbar", keys: ["⌘", "B"] },
    { label: "Open Settings", keys: ["⌘", "."] },
    { label: "Keyboard Shortcuts", keys: ["⌘", "/"] },
  ];

  return (
    <Modal title="Keyboard Shortcuts" opened={opened} onClose={() => setOpened(false)}>
      <Stack gap={15}>
        {shortcuts.map((shortcut, index) => (
          <Fragment key={shortcut.label}>
            {index > 0 && <Divider />}
            <Shortcut label={shortcut.label} keys={shortcut.keys} />
          </Fragment>
        ))}
      </Stack>
    </Modal>
  );
};
