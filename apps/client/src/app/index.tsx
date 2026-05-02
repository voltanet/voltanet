import { Anchor, Card, SimpleGrid, Stack, Text, ThemeIcon } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { PageLayout } from "@/components/layout";
import { CONFIG, PAGES_FLAT } from "@/features/const";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: `Dashboard | ${CONFIG.title}` }] }),
  component: () => {
    const [page, ...pages] = PAGES_FLAT;
    const isMobile = useMediaQuery("(max-width: 450px)");

    return (
      <PageLayout icon={page.icon} label={page.label}>
        <SimpleGrid type="container" cols={{ base: 2, "600px": 3 }}>
          {pages.map((page) => (
            <Anchor key={page.to} component={Link} to={page.to} underline="never">
              <Card component={Stack} align="center" style={{ zoom: isMobile ? 0.8 : 1 }}>
                <ThemeIcon size={100} color={page.color} variant="light">
                  <Iconify height={50} icon={page.icon} />
                </ThemeIcon>
                <Text fw="bold" fz="lg" ta="center">
                  {page.label}
                </Text>
              </Card>
            </Anchor>
          ))}
        </SimpleGrid>
      </PageLayout>
    );
  },
});
