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
      h="100%"
    >
      <Header />
      <NavBar />
      <AppShell.Main h="100%">
        <Container style={containerStyle} h="100%" size="lg" p={20}>
          {children}
          <ShortcutsView />
          <ScrollTop />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
