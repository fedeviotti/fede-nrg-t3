import type { ComponentStyleConfig } from "@chakra-ui/react";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  primary: {
    50: "#F7E6FF",
    100: "#E9C0FE",
    200: "#DB95FF",
    300: "#CC66FF",
    400: "#BF3BFE",
    500: "#AF09F4",
    600: "#9C0EEE",
    700: "#8212E7",
    800: "#6915DF",
    900: "#2B18D2",
  },
  secondary: {
    50: "#F0FFE7",
    100: "#D8FFC2",
    200: "#BCFF98",
    300: "#99FF66",
    400: "#77FC32",
    500: "#62F800",
    600: "#4CE600",
    700: "#25D000",
    800: "#00BB00",
    900: "#009600",
  },
  tertiary: {
    50: "#FFF3DA",
    100: "#FFE0A4",
    200: "#FFCC66",
    300: "#FEB71D",
    400: "#FCA700",
    500: "#FC9800",
    600: "#FA8B00",
    700: "#F57A00",
    800: "#F16800",
    900: "#E94A00",
  },
};

const fonts = {
  heading: "'Poppins', sans-serif",
  body: "'Poppins', sans serif",

};

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "normal",
  },
};

const components = {
  Button,
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const baseTheme = extendTheme({
  colors,
  // components,
  fonts,
  config,
});

export default baseTheme;
