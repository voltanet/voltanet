import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";
import { CreateDNSUpstream, DNSUpstreamList } from "@/features/dns-upstream";

const page = getPage("/dns/upstreams");

export const Route = createFileRoute("/dns/upstreams")({
  head: () => ({ meta: [{ title: `${page.label} | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="Configure and manage DNS upstreams for your domains."
        action={
          <CreateDNSUpstream>
            <Button variant="filled">Create New</Button>
          </CreateDNSUpstream>
        }
      >
        <DNSUpstreamList />
      </PageLayout>
    );
  },
});
