import { Button, Card, EmptyState, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { Iconify } from "@/components/iconify";
import { useDNSRewrites } from "../hooks";
import { CreateDNSRewrite } from "./create-dns-rewrite";
import { DNSRewriteCard } from "./dns-rewrite-card";
import { DNSRewriteSkeleton } from "./dns-rewrite-skeleton";

export const DNSRewriteList = () => {
  const { data, isFetching, error, refetch } = useDNSRewrites();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isFetching} refetch={() => void refetch()} />

      {!isFetching && data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No DNS rewrites found"
              description="Try adjusting your search or create a new DNS rewrite to get started."
              icon={<Iconify icon="@vite:iconamoon:box-light" />}
              variant="light"
            >
              <CreateDNSRewrite>
                <Button variant="filled">Create New</Button>
              </CreateDNSRewrite>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, "600px": 2 }} type="container">
          {isFetching && [...Array(4)].map((_, index) => <DNSRewriteSkeleton key={index} />)}
          {data?.items.map((item) => (
            <DNSRewriteCard key={item.id} item={item} />
          ))}
        </SimpleGrid>
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
