import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { trpc } from "utils/trpc";
import { useIsAuthenticated } from "hooks/useIsAuthenticated";
import { NavbarLayout } from "layouts/NavbarLayout";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const sessionData = useIsAuthenticated();
  const { t } = useTranslation("common");

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      <Box>
        <Center>
          <Text>
            {sessionData && `Logged in as ${sessionData.user?.name || sessionData.user?.email}`}
            {secretMessage && ` - ${secretMessage}`}
          </Text>
        </Center>
      </Box>
      <Box>
        <Text>
          {t("title")}
        </Text>
      </Box>
    </>
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
