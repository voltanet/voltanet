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
import type { $AccessControl } from "../types";
import { DeleteAccessControl } from "./delete-access-control";
import { UpdateAccessControl } from "./update-access-control";

const status = [
  ["Allow", "@vite:solar:global-bold", undefined],
  ["Deny", "@vite:solar:forbidden-circle-outline", "yellow"],
] as const;

export const AccessControlCard = ({ item }: { item: $AccessControl }) => {
  const [label, icon, color] = status[item.rule === "allow" ? 0 : 1];

  const content = [
    [item.rule, "rule", status[item.rule === "allow" ? 0 : 1][1]],
    ["Satisfy", item.satisfy, "@vite:solar:check-read-bold"],
    [item.credentials.length, "Credentials", "@vite:solar:users-group-rounded-bold"],
    [item.exceptions.length, "Exceptions", "@vite:solar:danger-circle-bold"],
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
            <DeleteAccessControl id={item.id}>
              <ActionIcon>
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteAccessControl>
            <UpdateAccessControl item={item} key={item.updatedAt.toString()}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateAccessControl>
          </Group>
        </Group>
        <Divider my={10} />
        <SimpleGrid cols={2}>
          {content.map(([label, value, icon], i) => (
            <Group key={i} gap={10} wrap="nowrap">
              <ThemeIcon variant="light" size="lg" color={color}>
                <Iconify icon={icon} />
              </ThemeIcon>
              <Text>
                <Text tt="capitalize" span>
                  {label}{" "}
                </Text>
                {value}
              </Text>
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
