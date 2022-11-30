import React from "react";
import { type NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

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
        <div>
          <h1>
            Fede <span>Nrg</span>
          </h1>
          <NextLink href="/dashboard">Dashboard</NextLink>
          <div>
            <p>
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
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
    <div>
      <p>
        {sessionData && <span>Logged in as {sessionData.user?.name || sessionData.user?.email}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        onClick={sessionData
          ? () => signOut()
          : () => signIn(undefined, {callbackUrl: redirect || "/dashboard"})
      }>
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
