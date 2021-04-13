import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  components: {
    Menu: {
      parts: ["item"],
      sizes: {
        sm: {
          item: {
            fontSize: "0.875rem",
            px: 4,
            py: 1.5,
          },
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
  },
  colors: {
    neutral: {
      100: "#F5F5F7",
      200: "#F0F0F3",
      300: "#EBEBEF",
      400: "#E1E0E7",
      500: "#CDCCD7",
      700: "#827F9B",
      900: "#050038",
    },
    primary: {
      500: "#0F1899",
      600: "#111ba7",
      700: "#3D51D4",
    },
    secondary: {
      500: "#FDCD06",
      600: "#C71414",
      700: "#B80D0D",
    },
  },
});

export default theme;
