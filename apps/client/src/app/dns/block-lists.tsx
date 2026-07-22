import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

const page = getPage("/dns/block-lists");

export const Route = createFileRoute("/dns/block-lists")({
  head: () => ({ meta: [{ title: `${page.label} | ${CONFIG.title}` }] }),
  component: () => {
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
