import { ActionIcon, Badge, Card, Divider, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { $DNSRewrite } from "../types";
import { DeleteDNSRewrite } from "./delete-dns-rewrite";
import { UpdateDNSRewrite } from "./update-dns-rewrite";

const status = [
  ["Enabled", "@vite:solar:route-bold", undefined],
  ["Disabled", "@vite:solar:forbidden-circle-outline", "yellow"],
] as const;

export type $DNSRewriteCard = { item: $DNSRewrite };

export const DNSRewriteCard = ({ item }: $DNSRewriteCard) => {
  const [label, icon, color] = status[item.enabled ? 0 : 1];

  return (
    <Card p={10}>
      <Paper p={20} m={-5} flex={1} withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            <ThemeIcon variant="light" size="lg" color={color}>
              <Iconify icon={icon} />
            </ThemeIcon>
            <Text lh="34px">{item.name}</Text>
          </Group>

          <Group gap={10} wrap="nowrap">
            <UpdateDNSRewrite item={item}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateDNSRewrite>

            <DeleteDNSRewrite id={item.id}>
              <ActionIcon color="red">
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteDNSRewrite>
          </Group>
        </Group>

        <Divider my={10} />

        <Group gap={10} wrap="wrap">
          <Badge color={color} variant="light" size="lg">
            {item.type}
          </Badge>
          <Badge color={color} variant="light" size="lg">
            {item.domain}
          </Badge>
          {item.upstream && (
            <Badge color={color} variant="light" size="lg">
              {item.upstream.name}
            </Badge>
          )}
        </Group>

        <Text mt={10} size="sm" c="dimmed">
          Destination: {item.destination}
        </Text>
      </Paper>

      <Group justify="space-between" mt={15}>
        <Badge color={color} variant="light" size="lg">
          {label}
        </Badge>
        <Text size="sm" c="dimmed">
          Updated: {dayjs(item.updatedAt).fromNow()}
        </Text>
      </Group>
    </Card>
  );
};
