import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/proxy/access")({
  head: () => ({ meta: [{ title: `Access Control | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/proxy/access");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage access policies for your proxy hosts."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
