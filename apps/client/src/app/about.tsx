import {
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/images/logo.svg";
import { Iconify } from "@/components/iconify";
import { PageLayout } from "@/components/layout";
import { CONFIG } from "@/features/const";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `${CONFIG.title} - About` }] }),
  component: () => {
    return (
      <PageLayout label="About" withBack>
        <Stack component={Card}>
          <Group gap={5} align="flex-start">
            <Image w={50} src={logo} alt="logo" />
            <Title order={1} fz={40}>
              {CONFIG.title}
            </Title>
          </Group>
          <Text>{CONFIG.description}</Text>
          <Text fz="sm" c="dimmed">
            Version {CONFIG.version}
          </Text>
        </Stack>
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {features.map((feature) => (
            <Stack component={Card} p={20} key={feature.title} gap={5}>
              <ThemeIcon variant="light" size="xl" mb={5}>
                <Iconify width={25} icon={feature.icon} />
              </ThemeIcon>
              <Text fw="bold">{feature.title}</Text>
              <Text fz="sm" c="dimmed">
                {feature.description}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
        <Divider />
        <Text>
          Copyright &copy; {new Date().getFullYear()} {CONFIG.title}. All rights reserved.
        </Text>
      </PageLayout>
    );
  },
});

const features = [
  {
    title: "DNS Managment",
    description: "Define custom domains, upstream or block the other ones",
    icon: "@vite:solar:route-bold",
  },
  {
    title: "Reverse Proxy",
    description: "Control access, proxy hosts and certificates for your web apps",
    icon: "@vite:solar:global-bold",
  },
  {
    title: "Activity",
    description: "Watch your changes and monitor services, backup and restore states anytime",
    icon: "@vite:solar:history-bold",
  },
  {
    title: "Lightweight",
    description: "Fast and simple by design all-in-one system",
    icon: "@vite:solar:bolt-bold",
  },
  {
    title: "Modern Design",
    description: "Easy to use modern and responsive design",
    icon: "@vite:solar:palette-bold",
  },
  {
    title: "Open Source",
    description: "Free to use and open source for everyone",
    icon: "@vite:solar:code-bold",
  },
];
