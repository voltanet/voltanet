import { Button, Card, EmptyState, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { Iconify } from "@/components/iconify";
import { useBlockLists } from "../hooks";
import { BlockListCard } from "./block-list-card";
import { CreateBlockList } from "./create-block-list";

export const BlockListList = () => {
  const { data, isLoading, error, refetch } = useBlockLists();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isLoading} refetch={() => void refetch()} />

      {data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No block lists found"
              description="Try adjusting your search or filter criteria or create a new block list to get started."
              icon={<Iconify icon="@vite:iconamoon:box-light" />}
              variant="light"
            >
              <CreateBlockList>
                <Button variant="filled">Create New</Button>
              </CreateBlockList>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, "600px": 2 }} type="container">
          {data?.items.map((item) => (
            <BlockListCard key={item.id} item={item} />
          ))}
        </SimpleGrid>
      )}

      <Group>
        <Text hidden={isLoading}>
          {data?.found || 0} matches of {data?.total || 0} total.
        </Text>
        <div style={{ flex: 1 }} />
        <Controls.Pagination total={data?.found || 0} />
      </Group>
    </Stack>
  );
};
