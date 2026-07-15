import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";
import { GeneralSettings } from "@/features/settings";

export const Route = createFileRoute("/settings/")({
  head: () => ({ meta: [{ title: `General | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout label="General" icon="@vite:solar:laptop-minimalistic-bold">
        <GeneralSettings />
      </PageLayout>
    );
  },
});
