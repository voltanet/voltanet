import { LoadingOverlay } from "@mantine/core";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Layout } from "@/components/Layout";
import { Providers } from "@/components/Providers";
import { MANIFEST } from "@/features/const";
import { useDynamicPWA } from "@/hooks/use-dynamic-pwa";

export const Route = createRootRoute({
  pendingComponent: () => <LoadingOverlay visible />,
  component: () => {
    useDynamicPWA(MANIFEST);

    return (
      <>
        <HeadContent />
        <Providers>
          <Layout children={<Outlet />} />
        </Providers>
        <TanStackRouterDevtools />
        <Scripts />
      </>
    );
  },
});
