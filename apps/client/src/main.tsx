import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorOverlay, NotFoundOverlay } from "./components/overlay";
import { Providers } from "./components/providers";
import { auth } from "./features/auth";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({
  scrollRestoration: true,
  defaultErrorComponent: ErrorOverlay,
  defaultNotFoundComponent: NotFoundOverlay,
  context: { session: null },
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  const { data: session, isPending } = auth.useSession();
  if (isPending) return;

  return (
    <StrictMode key={session?.session.id}>
      <Providers>
        <RouterProvider router={router} context={{ session }} />
      </Providers>
    </StrictMode>
  );
};

// Render the app
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
