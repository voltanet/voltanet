import { LoadingOverlay } from "@mantine/core";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { auth } from "@/features/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: session, isPending } = auth.useSession();

  if (isPending) return <LoadingOverlay visible />;

  if (pathname.startsWith("/auth") && session) {
    const href = new URL(location.href).searchParams.get("redirect") ?? "/";
    navigate({ href });
  }

  if (!pathname.startsWith("/auth") && !session) {
    navigate({ href: `/auth/login?redirect=${encodeURIComponent(pathname)}` });
  }

  return children;
};
