import { ActionIcon, Badge, Card, Divider, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { $Certificate } from "../types";
import { DeleteCertificate } from "./delete-certificate";
import { UpdateCertificate } from "./update-certificate";

const status = [
  ["Active", "@vite:solar:bolt-bold", undefined],
  ["Expiring Soon", "@vite:solar:clock-circle-bold", "yellow"],
  ["Expired", "@vite:solar:danger-triangle-bold", "red"],
] as const;

export const CertificateCard = ({ item }: { item: $Certificate }) => {
  const expired = dayjs(item.expiresAt).isBefore(dayjs());
  const expiringSoon = dayjs(item.expiresAt).isBefore(dayjs().add(30, "day"));
  const [label, icon, color] = status[expired ? 2 : expiringSoon ? 1 : 0];

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
            <DeleteCertificate id={item.id}>
              <ActionIcon>
                <Iconify icon="@vite:solar:trash-bin-2-bold" />
              </ActionIcon>
            </DeleteCertificate>
            <UpdateCertificate item={item} key={item.updatedAt.toString()}>
              <ActionIcon>
                <Iconify icon="@vite:solar:pen-bold" />
              </ActionIcon>
            </UpdateCertificate>
          </Group>
        </Group>
        <Divider my={10} />
        <Text>Expire Date: {dayjs(item.expiresAt).format("MMMM D, YYYY")}</Text>
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
