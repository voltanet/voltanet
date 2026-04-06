import { NavLink, Stack } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Page } from "@/features/const";
import { Iconify } from "../iconify";

export const NavItem = ({ to, icon, label, list }: Page) => {
  const { pathname } = useLocation();
  const [opened, setOpened] = useState(false);
  const children = list?.map((link, index) => <NavItem key={index} {...link} />);

  useEffect(() => {
    setOpened(pathname.startsWith(to));
  }, [pathname, to]);

  return (
    <NavLink
      to={to}
      label={label}
      component={Link}
      leftSection={<Iconify width={20} icon={icon} />}
      children={children ? <Stack gap={10} children={children} /> : undefined}
      onClick={() => setOpened((prev) => !prev)}
      style={{ borderRadius: 10 }}
      active={pathname === to}
      variant="light"
      opened={opened}
    />
  );
};
