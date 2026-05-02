import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";
import { AccountSettings } from "@/features/settings";

export const Route = createFileRoute("/settings/account")({
  head: () => ({ meta: [{ title: `Account | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout label="Account" icon="solar:user-bold">
        <AccountSettings />
      </PageLayout>
    );
  },
});
