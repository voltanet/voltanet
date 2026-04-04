import { Anchor, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Iconify } from "@/components/iconify";
import { CONFIG, PAGES_FLAT } from "@/features/const";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: `Dashboard | ${CONFIG.title}` }] }),
  component: () => {
    const [page, ...pages] = PAGES_FLAT;
    const isMobile = useMediaQuery("(max-width: 450px)");

    return (
      <Stack gap={15}>
        <Group>
          <ThemeIcon size="lg" color={page.color} variant="light">
            <Iconify height={20} icon={page.icon} />
          </ThemeIcon>
          <Title order={2}>{page.label}</Title>
        </Group>
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
      </Stack>
    );
  },
});
