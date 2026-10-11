import { Button, Card, EmptyState, Group, Paper, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { Iconify } from "@/components/iconify";
import { useProxyHosts } from "../hooks";
import { CreateProxyHost } from "./create-proxy-host";
import { ProxyHostCard } from "./proxy-host-card";
import { ProxyHostSkeleton } from "./proxy-host-skeleton";

export const ProxyHostsList = () => {
  const { data, isFetching, error, refetch } = useProxyHosts();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isFetching} refetch={() => void refetch()} />
      {!isFetching && data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No proxy hosts found"
              description="Try adjusting your search or filter criteria or create a new proxy host to get started."
              icon={<Iconify icon="@vite:iconamoon:box-light" />}
              variant="light"
            >
              <CreateProxyHost>
                <Button variant="filled">Create New</Button>
              </CreateProxyHost>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <>
          {isFetching && [...Array(2)].map((_, index) => <ProxyHostSkeleton key={index} />)}
          {data?.items.map((item) => (
            <ProxyHostCard key={item.id} item={item} />
          ))}
        </>
      )}
      <Group>
        <Text hidden={isFetching}>
          {data?.found || 0} matches of {data?.total || 0} total.
        </Text>
        <div style={{ flex: 1 }} />
        <Controls.Pagination total={data?.found || 0} />
      </Group>
    </Stack>
  );
};
