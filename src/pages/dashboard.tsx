import React from "react";
import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: sessionData } = useSession();
  const router = useRouter()

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  React.useEffect(() => {
    if (!sessionData) {
      router.replace("/");
    }
  }, [router, sessionData]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </div>
    </div>
  )
}

export default Dashboard;
