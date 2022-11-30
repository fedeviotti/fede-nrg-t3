import React from "react";
import { trpc } from "../utils/trpc";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";
import { Center, Text } from "@chakra-ui/react";

const Dashboard = () => {
  const sessionData = useIsAuthenticated();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <Center>
      <Text>
        {sessionData && `Logged in as ${sessionData.user?.name || sessionData.user?.email}`}
        {secretMessage && ` - ${secretMessage}`}
      </Text>
    </Center>
  )
}

export default Dashboard;
