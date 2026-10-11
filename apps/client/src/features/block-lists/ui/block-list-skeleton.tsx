import { Card, Divider, Group, Paper, Skeleton } from "@mantine/core";

export const BlockListSkeleton = () => {
  return (
    <Card p={10}>
      <Paper p={20} m={-5} flex={1} withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            <Skeleton height={30} width={30} />
            <Skeleton height={30} w={140} />
          </Group>
          <Group gap={10} wrap="nowrap">
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
            <Skeleton height={30} width={30} />
          </Group>
        </Group>

        <Divider my={10} />

        <Group>
          <Skeleton height={30} w={90} radius="xl" />
          <Skeleton height={30} w={120} radius="xl" />
        </Group>
      </Paper>

      <Group justify="space-between" mt={15}>
        <Skeleton height={20} w={100} radius="xl" />
        <Skeleton height={20} w={150} />
      </Group>
    </Card>
  );
};
