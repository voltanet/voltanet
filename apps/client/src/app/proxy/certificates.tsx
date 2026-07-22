import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CertificateList, CreateCertificate } from "@/features/certificates";
import { CONFIG, getPage } from "@/features/const";

const page = getPage("/proxy/certificates");

export const Route = createFileRoute("/proxy/certificates")({
  head: () => ({ meta: [{ title: `${page.label} | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Manage and Upload SSL certificates for your proxy hosts."
        action={
          <CreateCertificate>
            <Button variant="filled">Create New</Button>
          </CreateCertificate>
        }
      >
        <CertificateList />
      </PageLayout>
    );
  },
});
