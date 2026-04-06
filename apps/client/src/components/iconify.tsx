import { addAPIProvider, Icon, type IconifyIcon, type IconProps, loadIcon } from "@iconify/react";
import { useMemo, useState } from "react";

addAPIProvider("local", {
  resources: [location.origin],
  path: "/api/icons/",
});

export type $Iconify = IconProps & { icon: string };

export const Iconify = ({ icon, ...props }: $Iconify) => {
  const [data, setData] = useState<Required<IconifyIcon> | string>("");
  useMemo(() => iconLoader(icon).then(setData), [icon]);

  return <Icon {...props} icon={data} />;
};

const iconLoader = async (icon: string) =>
  new Promise<Required<IconifyIcon>>(async (resolve) => {
    const cached = localStorage.getItem(`iconify$${icon}`);
    if (cached) return resolve(JSON.parse(cached));
    const data = await loadIcon(icon.startsWith("solar:") ? `@local:${icon}` : icon);
    localStorage.setItem(`iconify$${icon}`, JSON.stringify(data));
    resolve(data);
  });
