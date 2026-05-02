import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";
import { SecuritySettings } from "@/features/settings";

export const Route = createFileRoute("/settings/security")({
  head: () => ({ meta: [{ title: `Security | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout label="Security" icon="solar:shield-bold">
        <SecuritySettings />
      </PageLayout>
    );
  },
});
