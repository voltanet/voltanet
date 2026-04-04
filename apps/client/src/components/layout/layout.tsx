import { AppShell, Container } from "@mantine/core";
import { useLocation } from "@tanstack/react-router";
import { Header } from "../header";
import { NavBar, useNavBar } from "../navbar";
import { ScrollTop } from "../scroll-top";
import { ShortcutsView } from "../shortcuts";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [opened] = useNavBar();
  const { pathname } = useLocation();
  const disabled = pathname.startsWith("/auth");
  const containerStyle = { container: "main-view / inline-size" };

  return (
    <AppShell
      header={{ height: 60, collapsed: false, offset: true }}
      navbar={{ width: 300, collapsed: { mobile: !opened, desktop: disabled }, breakpoint: "sm" }}
      disabled={disabled}
    >
      <Header />
      <NavBar />
      <AppShell.Main>
        <Container style={containerStyle} p={20}>
          {children}
          <ScrollTop />
          <ShortcutsView />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
