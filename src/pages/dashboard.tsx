import React from "react";
import { Center, Text } from "@chakra-ui/react";
import { trpc } from "utils/trpc";
import { useIsAuthenticated } from "hooks/useIsAuthenticated";
import { NavbarLayout } from "layouts/NavbarLayout";

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

Dashboard.getLayout = function getLayout(memory: React.ReactElement) {
  return (
    <NavbarLayout>
      {memory}
    </NavbarLayout>
  );
};

export default Dashboard;
