import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { $ProxyHost } from "../types";
import { DeleteProxyHost } from "./delete-proxy-host";
import { UpdateProxyHost } from "./update-proxy-host";

const status = [
  ["Enabled", "@vite:solar:global-bold", undefined],
  ["Disabled", "@vite:solar:forbidden-circle-outline", "yellow"],
] as const;

export type $ProxyHostCard = { item: $ProxyHost };

export const ProxyHostCard = ({ item }: $ProxyHostCard) => {
  const [label, icon, color] = status[item.enabled ? 0 : 1];

  const main = [
    [
      "Domains",
      <Group key="domains" gap={5}>
        {item.domains.map((domain) => (
          <Badge key={domain} variant="light" size="lg" color={color}>
            {domain}
          </Badge>
        ))}
      </Group>,
      "@vite:solar:global-bold",
    ],
    [
      "Distnation",
      <Badge
        key="distnation"
        variant="light"
        color={color}
        size="lg"
      >{`${item.destination.protocol}://${item.destination.hostname}:${item.destination.port}`}</Badge>,
      "@vite:solar:server-bold",
    ],
  ] as const;

  const content = [
    ["Websocket", item.websocket ? "Yes" : "No", "@vite:solar:sort-horizontal-outline"],
    ["Force HTTPS", item.forceHttps ? "Yes" : "No", "@vite:solar:lock-bold"],
    ["Access Control", item.accessControl?.name ?? "N/A", "@vite:solar:shield-user-bold"],
    ["Certificate", item.certificate?.name ?? "N/A", "@vite:solar:book-bookmark-bold"],
  ] as const;

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
            <DeleteProxyHost id={item.id}>
              <ActionIcon>
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteProxyHost>
            <UpdateProxyHost item={item} key={item.updatedAt.toString()}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateProxyHost>
          </Group>
        </Group>
        <Divider my={10} />
        <SimpleGrid cols={{ base: 1, "500px": 2 }} type="container">
          {main.map(([label, value, icon], i) => (
            <Group key={i} gap={10} wrap="nowrap" align="flex-start">
              <ThemeIcon variant="light" size="lg" color={color}>
                <Iconify icon={icon} />
              </ThemeIcon>
              <div>
                <Text fz="sm" c="dimmed">
                  {label}
                </Text>
                {value}
              </div>
            </Group>
          ))}
        </SimpleGrid>
        <Divider my={10} />
        <SimpleGrid cols={{ base: 2, "600px": 4 }} type="container">
          {content.map(([label, value, icon], i) => (
            <Group key={i} gap={10} wrap="nowrap" align="flex-start">
              <ThemeIcon variant="light" size="lg" color={color}>
                <Iconify icon={icon} />
              </ThemeIcon>
              <div>
                <Text fz="sm" c="dimmed">
                  {label}
                </Text>
                <Text>{value}</Text>
              </div>
            </Group>
          ))}
        </SimpleGrid>
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
