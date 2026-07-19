import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/dns/block-lists")({
  head: () => ({ meta: [{ title: `Block Lists | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/dns/block-lists");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage block lists for your DNS Server."
        action={<Button variant="filled">Create New</Button>}
      ></PageLayout>
    );
  },
});
