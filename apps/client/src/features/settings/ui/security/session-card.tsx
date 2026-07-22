import { Badge, Card, Divider, Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import dayjs from "dayjs";
import { Iconify } from "@/components/iconify";
import type { Session } from "@/features/auth";
import { RevokeSession } from "./revoke-session";

const status = [
  ["@vite:solar:user-bold", undefined],
  ["@vite:solar:clock-circle-bold", "yellow"],
] as const;

export const SessionCard = ({ session, isCurrent }: { session: Session; isCurrent?: boolean }) => {
  const [icon, color] = status[isCurrent ? 0 : 1];

  const content = [
    ["IP Address", session.ipAddress || "N/A", "@vite:solar:map-point-bold"],
    [
      "Expires",
      dayjs(session.expiresAt).format("DD MMM, hh:mm A"),
      "@vite:solar:clock-circle-bold",
    ],
  ] as const;

  return (
    <Card p={10}>
      <Paper p={20} m={-5} flex={1} withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            <ThemeIcon variant="light" size="lg" color={color}>
              <Iconify icon={icon} />
            </ThemeIcon>
            <Text lh="34px">Session ({session.id.slice(0, 8).toLowerCase()})</Text>
          </Group>
          <RevokeSession token={session.token} />
        </Group>
        <Divider my={10} />
        <SimpleGrid cols={2}>
          {content.map(([label, value, icon], i) => (
            <Group key={i} gap={10} wrap="nowrap" align="flex-start">
              <ThemeIcon variant="light" size="lg" color={color}>
                <Iconify icon={icon} />
              </ThemeIcon>
              <div>
                <Text size="sm" c="dimmed">
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
          {isCurrent ? "Current" : "Another"}
        </Badge>
        <Text size="sm" c="dimmed">
          Logged: {dayjs(session.createdAt).fromNow()}
        </Text>
      </Group>
    </Card>
  );
};
