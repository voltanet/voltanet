import * as Core from "@mantine/core";
import { useAutoContrast, useDisplaySize, useFontFamily } from "@/features/settings";

export const useAppTheme = () => {
  const [fontFamily] = useFontFamily();
  const [autoContrast] = useAutoContrast();
  const [scale] = useDisplaySize();

  return Core.createTheme({
    fontFamily: `${fontFamily}, sans-serif`,
    primaryColor: "teal",
    defaultRadius: 10,
    autoContrast,
    scale,
    colors: { text: Core.colorsTuple("var(--mantine-color-text)") },
    components: {
      Avatar: Core.Avatar.extend({ defaultProps: { radius: 5 } }),
      Accordion: Core.Accordion.extend({ defaultProps: { radius: "lg" } }),
      SimpleGrid: Core.SimpleGrid.extend({ defaultProps: { spacing: 20 } }),
      ActionIcon: Core.ActionIcon.extend({ defaultProps: { size: 36, variant: "default" } }),
      LoadingOverlay: Core.LoadingOverlay.extend({ defaultProps: { overlayProps: { blur: 5 } } }),
      Button: Core.Button.extend({ defaultProps: { variant: "default", w: "fit-content" } }),
      Badge: Core.Badge.extend({ defaultProps: { radius: 5, tt: "none" } }),
      Group: Core.Group.extend({ defaultProps: { gap: 20 } }),
      Stack: Core.Stack.extend({ defaultProps: { gap: 20 } }),
      Card: Core.Card.extend({
        styles: { root: { overflow: "visible" } },
        defaultProps: { withBorder: true },
      }),
      Modal: Core.Modal.extend({
        defaultProps: {
          overlayProps: { blur: 5 },
          transitionProps: { transition: "fade-up" },
          centered: true,
        },
      }),
      Menu: Core.Menu.extend({
        defaultProps: {
          // shadow: "sm",
          keepMounted: true, // keep in DOM, required for modals
          arrowPosition: "center",
          withinPortal: false,
          withArrow: true,
          arrowSize: 12,
        },
      }),
    },
  });
};
