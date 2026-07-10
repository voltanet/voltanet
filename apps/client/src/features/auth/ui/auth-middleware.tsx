import type { Session, User } from "@repo/server/auth";
import { redirect } from "@tanstack/react-router";

export type AuthSession = null | {
  session: Session;
  user: User;
};

export const authMiddleware = (session: AuthSession, pathname: string) => {
  if (pathname.startsWith("/auth") && session) {
    const href = new URL(location.href).searchParams.get("redirect") ?? "/";
    throw redirect({ href, replace: true });
  }

  if (!pathname.startsWith("/auth") && !session) {
    const href = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
    throw redirect({ href, replace: true });
  }
};
