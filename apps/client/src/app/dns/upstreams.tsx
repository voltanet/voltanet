import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/dns/upstreams")({
  head: () => ({ meta: [{ title: `DNS Upstreams | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/dns/upstreams");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage DNS upstreams for your domains."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
