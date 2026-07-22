import { Button, Card, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { EmptyState } from "@/components/empty-state";
import { useAccessControls } from "../hooks";
import { AccessControlCard } from "./access-control-card";
import { AccessControlSkeleton } from "./access-control-skeleton";
import { CreateAccessControl } from "./create-access-control";

export const AccessControlList = () => {
  const { data, isLoading, error, refetch } = useAccessControls();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isLoading} refetch={() => void refetch()} />
      {data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No access controls found"
              description="Try adjusting your search or filter criteria or create a new access control to get started."
            >
              <CreateAccessControl>
                <Button variant="filled">Create New</Button>
              </CreateAccessControl>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, "600px": 2 }} type="container">
          {isLoading && [...Array(4)].map((_, index) => <AccessControlSkeleton key={index} />)}
          {data?.items.map((item) => (
            <AccessControlCard key={item.id} item={item} />
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
