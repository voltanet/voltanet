import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { Iconify } from "./iconify";

export const ScrollTop = () => {
  const [scroll, scrollTo] = useWindowScroll();

  const top = () => scrollTo({ y: 0 });

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(style) => (
          <ActionIcon variant="default" size="lg" onClick={top} style={style}>
            <Iconify width={20} icon="solar:alt-arrow-up-bold" />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};
