import { Card, Divider, Group, Paper, SimpleGrid, Skeleton } from "@mantine/core";

export const ProxyHostSkeleton = () => {
  return (
    <Card p={10}>
      <Paper p={20} m={-5} flex={1} withBorder>
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            <Skeleton height={30} width={30} />
            <Skeleton height={30} w={140} />
          </Group>
          <Skeleton height={30} width={70} />
        </Group>
        <Divider my={10} />
        <SimpleGrid cols={{ base: 1, "500px": 2 }} type="container">
          <Skeleton height={60} />
          <Skeleton height={60} />
        </SimpleGrid>
        <Divider my={10} />
        <SimpleGrid cols={{ base: 2, "600px": 4 }} type="container">
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </SimpleGrid>
      </Paper>
      <Group justify="space-between" mt={15}>
        <Skeleton height={20} w={100} radius="xl" />
        <Skeleton height={20} w={150} />
      </Group>
    </Card>
  );
};
