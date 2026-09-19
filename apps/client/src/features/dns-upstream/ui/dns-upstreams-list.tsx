import { Button, Card, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { EmptyState } from "@/components/empty-state";
import { useDNSUpstreams } from "../hooks";
import { CreateDNSUpstream } from "./create-dns-upstream";
import { DNSUpstreamCard } from "./dns-upstream-card";
import { DNSUpstreamSkeleton } from "./dns-upstream-skeleton";

export const DNSUpstreamList = () => {
  const { data, isLoading, error, refetch } = useDNSUpstreams();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isLoading} refetch={() => void refetch()} />
      {data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No DNS upsteams found"
              description="Try adjusting your search or filter criteria or create a new DNS upstream to get started."
            >
              <CreateDNSUpstream>
                <Button variant="filled">Create New</Button>
              </CreateDNSUpstream>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, "600px": 2 }} type="container">
          {isLoading && [...Array(4)].map((_, index) => <DNSUpstreamSkeleton key={index} />)}
          {data?.items.map((certificate) => (
            <DNSUpstreamCard key={certificate.id} item={certificate} />
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
