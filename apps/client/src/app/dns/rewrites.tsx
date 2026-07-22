import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

const page = getPage("/dns/rewrites");

export const Route = createFileRoute("/dns/rewrites")({
  head: () => ({ meta: [{ title: `${page.label} | ${CONFIG.title}` }] }),
  component: () => {
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
