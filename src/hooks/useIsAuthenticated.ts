import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function useIsAuthenticated() {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (router && status === "unauthenticated") {
      router.push(`/?redirect=${router.asPath}`);
    }
  }, [router, status]);

  return sessionData;
}
