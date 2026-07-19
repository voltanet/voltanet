import { SegmentedControl } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout";
import { CONFIG, getPage } from "@/features/const";

export const Route = createFileRoute("/activity")({
  head: () => ({ meta: [{ title: `Activity Logs | ${CONFIG.title}` }] }),
  component: () => {
    const page = getPage("/activity");
    const [view, setView] = useLocalStorage({ key: "activity-view", defaultValue: "Activity" });

    return (
      <PageLayout
        icon={page.icon}
        label={page.label}
        description="View and manage recent activity logs and events across the platform."
        action={<SegmentedControl data={["Activity", "Logs"]} value={view} onChange={setView} />}
      >
        {view === "Activity" && <div>Activity</div>}
        {view === "Logs" && <div>Logs</div>}
      </PageLayout>
    );
  },
});
