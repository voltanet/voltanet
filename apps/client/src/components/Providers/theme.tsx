import * as Core from "@mantine/core";

export const useAppTheme = () => {
  const fontFamily = "Roboto";
  const autoContrast = false;
  const scale = 1;

  return Core.createTheme({
    fontFamily: `${fontFamily}, sans-serif`,
    primaryColor: "green",
    defaultRadius: 10,
    autoContrast,
    scale,
    colors: {
      green: Core.colorsTuple("#00A550"),
      text: Core.colorsTuple("var(--mantine-color-text)"),
    },
    components: {
      Avatar: Core.Avatar.extend({ defaultProps: { radius: 5 } }),
      Accordion: Core.Accordion.extend({ defaultProps: { radius: "lg" } }),
      Badge: Core.Badge.extend({ defaultProps: { radius: 5, tt: "none" } }),
      Button: Core.Button.extend({ defaultProps: { variant: "default" } }),
      Group: Core.Group.extend({ defaultProps: { gap: 10 } }),
      Stack: Core.Stack.extend({ defaultProps: { gap: 10 } }),
      Card: Core.Card.extend({
        styles: { root: { overflow: "visible" } },
        defaultProps: { withBorder: true },
      }),
      AppShell: Core.AppShell.extend({
        styles: { header: { paddingTop: "env(safe-area-inset-top)" } },
      }),
      LoadingOverlay: Core.LoadingOverlay.extend({
        defaultProps: { overlayProps: { blur: 5 } },
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
          shadow: "sm",
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
