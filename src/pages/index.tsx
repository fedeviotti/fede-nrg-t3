import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react";

// const BACKGROUND_IMAGES = [
//   "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80",
////   "https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1675&q=80"
//   "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
// ]

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Fede Nrg</title>
        <meta name="description" content="Fede Nrg App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          backgroundImage="url('https://images.unsplash.com/photo-1610296669228-602fa827fc1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1675&q=80')"
          backgroundPosition="cover"
          backgroundRepeat="no-repeat"
        >
          <Center height="100vh">
            <Stack alignItems="center" spacing={8}>
              <Stack direction="row">
                <Heading as='h1' size='4xl' color="tertiary.50">
                  Fede
                </Heading>
                <Heading as='h1' size='4xl' color="tertiary.500">
                  Nrg
                </Heading>
              </Stack>
              <NextLink href="/dashboard">
                <Text color="white" fontSize="xl">Dashboard</Text>
              </NextLink>
              <Text color="white" fontSize="xl">
                {hello.data ? hello.data.greeting : "Loading tRPC query..."}
              </Text>
              <AuthShowcase />
            </Stack>
          </Center>
        </Box>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const redirect = router.query.redirect as string;

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      <Text color="white">
        {sessionData && `Logged in as ${sessionData.user?.name || sessionData.user?.email}`}
        {secretMessage && ` - ${secretMessage}`}
      </Text>
      <Button
        colorScheme="whiteAlpha"
        onClick={sessionData
          ? () => signOut()
          : () => signIn(undefined, {callbackUrl: redirect || "/dashboard"})
      }>
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </>
  );
};
