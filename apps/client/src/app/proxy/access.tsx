import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { AccessControlList, CreateAccessControl } from "@/features/access-controls";
import { CONFIG, getPage } from "@/features/const";

const page = getPage("/proxy/access");

export const Route = createFileRoute("/proxy/access")({
  head: () => ({ meta: [{ title: `${page.label} | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage access policies for your proxy hosts."
        action={
          <CreateAccessControl>
            <Button variant="filled">Create New</Button>
          </CreateAccessControl>
        }
      >
        <AccessControlList />
      </PageLayout>
    );
  },
});
