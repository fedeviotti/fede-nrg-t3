import React from "react";
import type { AppProps } from "next/app";
import { type Session } from "next-auth";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";

import { Fonts } from "~/components/styles/Fonts";
import { trpc } from "~/utils/trpc";
import "i18n";

import "styles/globals.css";
import baseTheme from "~/themes/baseTheme";
import { NavbarLayout } from "~/layouts/NavbarLayout";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps<{ session: Session | null }> & {
  Component: NextPageWithLayout;
};

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => <NavbarLayout>{page}</NavbarLayout>);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={baseTheme}>
        <Fonts />
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
