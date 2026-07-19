import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/proxy/hosts")({
  head: () => ({ meta: [{ title: `Proxy Hosts | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/proxy/hosts");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage your proxy hosts with custom domains and SSL/TLS options."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
