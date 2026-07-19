import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/dns/rewrites")({
  head: () => ({ meta: [{ title: `DNS Rewrites | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/dns/rewrites");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage DNS rewrites for your domains."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
