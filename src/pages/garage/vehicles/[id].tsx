import React from "react";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import { useIsAuthenticated } from "hooks/useIsAuthenticated";
import {
  Button, Flex, Heading, Spinner, Stack, Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";

const VehicleMaintenance = () => {
  const { t } = useTranslation("common");
  const sessionData = useIsAuthenticated();
  const router = useRouter();
  const { id } = router.query;
  const { data: vehicle, isLoading, isError } = trpc.garage.getVehicleById.useQuery(
    { id: Number(id) },
    { enabled: sessionData?.user !== undefined },
  );

  if (isError) return <Flex justifyContent="center">An error occurred.</Flex>;
  if (isLoading) return <Flex justifyContent="center"><Spinner size="lg" /></Flex>;

  return (
    <Stack direction="column" spacing="32px">
      <Stack direction="row" justifyContent="space-between">
        <Button leftIcon={<ArrowBackIcon />} onClick={router.back}>
          {t("back")}
        </Button>
        {/* onClick open Drawer */}
        <Button leftIcon={<AddIcon />}>
          {t("garage.vehicle.card.maintenance.cta_add")}
        </Button>
      </Stack>
      <Stack direction="column" spacing="16px">
        <Heading size="md">
          {vehicle?.name}
        </Heading>
        <Text>
          {vehicle?.description}
        </Text>
        {/* Add Image  */}
        {/* Add list maintenance as table */}
      </Stack>
    </Stack>
  );
};

export default VehicleMaintenance;
