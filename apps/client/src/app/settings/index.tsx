import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";
import { AppearanceSettings } from "@/features/settings";

export const Route = createFileRoute("/settings/")({
  head: () => ({ meta: [{ title: `Appearance | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <PageLayout label="Appearance" icon="solar:laptop-minimalistic-bold">
        <AppearanceSettings />
      </PageLayout>
    );
  },
});
