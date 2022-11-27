import React from "react";
import { trpc } from "../utils/trpc";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

const Dashboard = () => {
  const sessionData = useIsAuthenticated();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name || sessionData.user?.email}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </div>
    </div>
  )
}

export default Dashboard;
