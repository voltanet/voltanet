import {
  ActionIcon,
  Anchor,
  Badge,
  Card,
  Divider,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { $BlockList } from "../types";
import { DeleteBlockList } from "./delete-block-list";
import { SyncBlockList } from "./sync-block-list";
import { UpdateBlockList } from "./update-block-list";

export type $BlockListCard = { item: $BlockList };

export const BlockListCard = ({ item }: $BlockListCard) => {
  const typeIcon =
    item.type === "url" ? "@vite:solar:global-bold" : "@vite:solar:document-text-bold";
  const status = [
    ["Enabled", typeIcon, undefined],
    ["Disabled", "@vite:solar:forbidden-circle-outline", "yellow"],
  ] as const;
  const [label, icon, color] = status[item.enabled ? 0 : 1];

  return (
    <Card p={10}>
      <Paper p={20} m={-5} flex={1} withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            <ThemeIcon variant="light" size="lg" color={color}>
              <Iconify icon={icon} />
            </ThemeIcon>
            <Text>{item.name}</Text>
          </Group>

          <Group gap={10} wrap="nowrap">
            {item.type === "url" && <SyncBlockList id={item.id} />}

            <UpdateBlockList item={item}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateBlockList>

            <DeleteBlockList id={item.id}>
              <ActionIcon color="red">
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteBlockList>
          </Group>
        </Group>

        <Divider my={10} />

        <Group gap={10} wrap="wrap">
          <Badge color={color} variant="light" size="lg">
            {item.type.toUpperCase()}
          </Badge>
          <Badge color={color} variant="light" size="lg">
            {item.count ?? 0} entries
          </Badge>
          {item.type === "url" && (
            <Anchor href={item.value} c={color} target="_blank" fz="sm">
              View Content
            </Anchor>
          )}
        </Group>
      </Paper>

      <Group justify="space-between" mt={15}>
        <Badge color={color} variant="light" size="lg">
          {label}
        </Badge>
        <Text size="sm" c="dimmed">
          Last synced: {dayjs(item.lastSyncAt).fromNow()}
        </Text>
      </Group>
    </Card>
  );
};
