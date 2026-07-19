import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/proxy/certificates")({
  head: () => ({ meta: [{ title: `Certificates | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/proxy/certificates");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Manage and Upload SSL certificates for your proxy hosts."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
