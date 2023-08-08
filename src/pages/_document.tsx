import { ColorModeScript } from "@chakra-ui/react";
import {
  Html, Head, Main, NextScript,
} from "next/document";
import theme from "~/themes/baseTheme";

// eslint-disable-next-line react/function-component-definition
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
