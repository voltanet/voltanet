import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { Controls } from "@/components/controls";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/(proxy)/proxy-hosts")({
  head: () => ({ meta: [{ title: `Proxy Hosts | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/proxy-hosts");

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Manage your proxy hosts here."
        action={<Button variant="filled">Create Host</Button>}
      >
        <Controls refetch={async () => {}} loading={false} />
        <Controls.Pagination total={100} />
      </PageLayout>
    );
  },
});
