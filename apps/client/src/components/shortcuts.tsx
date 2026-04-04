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

const state = atom(false);

const Shortcut = ({ label, keys }: { label: string; keys: string[] }) => (
  <Group justify="space-between">
    <Text fz="sm">{label}</Text>
    <Group>
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
      leftSection={<Iconify width={20} icon="solar:keyboard-outline" />}
      children="Keyboard Shortcuts"
    />
  );
};

export const ShortcutsView = () => {
  const navigate = useNavigate();
  const [opened, setOpened] = useAtom(state);
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([
    ["mod + /", () => setOpened(!opened)],
    ["mod + .", () => navigate({ to: "/settings" })],
    ["mod + j", toggleColorScheme],
  ]);

  const shortcuts = [
    { label: "Open Search", keys: ["⌘", "K"] },
    { label: "Toggle Theme", keys: ["⌘", "J"] },
    { label: "Open Settings", keys: ["⌘", "."] },
    { label: "Keyboard Shortcuts", keys: ["⌘", "/"] },
  ];

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} title="Keyboard Shortcuts">
      <Stack>
        {shortcuts.map((shortcut, index) => (
          <Fragment key={index}>
            {index > 0 && <Divider />}
            <Shortcut label={shortcut.label} keys={shortcut.keys} />
          </Fragment>
        ))}
      </Stack>
    </Modal>
  );
};
