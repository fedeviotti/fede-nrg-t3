import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function useIsAuthenticated(){
  const [isRedirected, setIsRedirected] = React.useState(false);
  const { data: sessionData } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (router && !sessionData && !isRedirected) {
      router.push("/");
      setIsRedirected(true);
    }
  }, [isRedirected, router, sessionData]);

  return sessionData;
}
