import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Flex,
  Group,
  Paper,
  Text,
  ThemeIcon,
} from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { $DNSUpstream } from "../types";
import { DeleteDNSUpstream } from "./delete-dns-upstream";
import { UpdateDNSUpstream } from "./update-dns-upstream";

const status = [
  ["Enabled", "@vite:solar:cloud-upload-bold", undefined],
  ["Disabled", "@vite:solar:forbidden-circle-outline", "yellow"],
] as const;

export const DNSUpstreamCard = ({ item }: { item: $DNSUpstream }) => {
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
            <DeleteDNSUpstream id={item.id}>
              <ActionIcon>
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteDNSUpstream>
            <UpdateDNSUpstream item={item} key={item.updatedAt.toString()}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateDNSUpstream>
          </Group>
        </Group>
        <Divider my={10} />
        <Flex gap={10}>
          {item.servers.map(({ server, port }, index) => (
            <Badge color={color} variant="light" size="lg" key={index}>
              {server}#{port}
            </Badge>
          ))}
        </Flex>
      </Paper>
      <Group justify="space-between" mt={15}>
        <Badge color={color} variant="light" size="lg">
          {label}
        </Badge>
        <Text size="sm" c="dimmed">
          Last updated: {dayjs(item.updatedAt).fromNow()}
        </Text>
      </Group>
    </Card>
  );
};
