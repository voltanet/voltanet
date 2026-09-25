import { AppShell, Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation } from "@tanstack/react-router";
import { Header } from "../header";
import { NavBar, useNavBar } from "../navbar";
import { ScrollTop } from "../scroll-top";
import { ShortcutsView } from "../shortcuts";

export type $Layout = { children?: React.ReactNode };

export const Layout = ({ children }: $Layout) => {
  const [opened] = useNavBar();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const containerStyle = { container: "main-view / inline-size" };
  const disabled = pathname.startsWith("/auth");

  return (
    <AppShell
      h="100%"
      disabled={disabled}
      header={{ height: 60, collapsed: false, offset: true }}
      navbar={{
        width: { base: 200, md: 250 },
        collapsed: { mobile: !opened, desktop: !opened || disabled },
        breakpoint: "sm",
      }}
    >
      <Header />
      <Container style={containerStyle} h="100%" size="lg" p={0}>
        {(opened || isMobile) && <NavBar />}
        <AppShell.Main h="100%" mx={20} py={80}>
          {children}
          <ShortcutsView />
          <ScrollTop />
        </AppShell.Main>
      </Container>
    </AppShell>
  );
};
