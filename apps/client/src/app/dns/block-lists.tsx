import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { BlockListList, CreateBlockList } from "@/features/block-lists";
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
        action={
          <CreateBlockList>
            <Button variant="filled">Create New</Button>
          </CreateBlockList>
        }
      >
        <BlockListList />
      </PageLayout>
    );
  },
});
