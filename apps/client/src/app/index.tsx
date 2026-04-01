import { createFileRoute } from "@tanstack/react-router";
import { CONFIG } from "@/features/const";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: `Dashboard | ${CONFIG.title}` }] }),
  component: () => {
    return (
      <div>
        <h1>Hello World</h1>
        <p>This is the dashboard page</p>
      </div>
    );
  },
});
