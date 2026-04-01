import { AppShell, Container } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { Header, useNavBarOpened } from "../Header";
import { ScrollTop } from "../ui/scroll-top";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [opened] = useNavBarOpened();
  const pinned = useHeadroom({ fixedAt: 120 });
  const containerStyle = { container: "main-view / inline-size" };

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: true }}
      navbar={{ width: 300, collapsed: { mobile: !opened, desktop: opened }, breakpoint: "sm" }}
    >
      <Header />
      <AppShell.Main pt={60}>
        <Container style={containerStyle} size="lg" p={20}>
          {children}
          <ScrollTop />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
