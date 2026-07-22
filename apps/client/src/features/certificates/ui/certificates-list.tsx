import { Button, Card, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { Controls } from "@/components/controls";
import { EmptyState } from "@/components/empty-state";
import { useCertificates } from "../hooks";
import { CertificateCard } from "./certificate-card";
import { CertificateSkeleton } from "./certificate-skeleton";
import { CreateCertificate } from "./create-certificate";

export const CertificateList = () => {
  const { data, isLoading, error, refetch } = useCertificates();

  if (error) throw error;

  return (
    <Stack>
      <Controls loading={isLoading} refetch={() => void refetch()} />
      {data?.items.length === 0 ? (
        <Card p={5}>
          <Paper py={50} withBorder>
            <EmptyState
              title="No certificates found"
              description="Try adjusting your search or filter criteria or create a new certificate to get started."
            >
              <CreateCertificate>
                <Button variant="filled">Create New</Button>
              </CreateCertificate>
            </EmptyState>
          </Paper>
        </Card>
      ) : (
        <SimpleGrid cols={{ base: 1, "600px": 2 }} type="container">
          {isLoading && [...Array(4)].map((_, index) => <CertificateSkeleton key={index} />)}
          {data?.items.map((certificate) => (
            <CertificateCard key={certificate.id} item={certificate} />
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
