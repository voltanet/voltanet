import { LoadingOverlay } from "@mantine/core";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { Layout } from "@/components/layout";
import { Providers } from "@/components/providers";
import { type AuthSession, authMiddleware } from "@/features/auth";
import { MANIFEST } from "@/features/const";
import { useDynamicPWA } from "@/hooks/use-dynamic-pwa";

export const Route = createRootRouteWithContext<{ session: AuthSession }>()({
  pendingComponent: () => <LoadingOverlay visible />,
  beforeLoad: (ctx) => authMiddleware(ctx.context.session, ctx.location.pathname),
  component: () => {
    useDynamicPWA(MANIFEST);

    return (
      <>
        <HeadContent />
        <Providers>
          <Layout>
            <Outlet />
          </Layout>
        </Providers>
        <Scripts />
      </>
    );
  },
});
