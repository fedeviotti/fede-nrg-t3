import React from "react";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import { useIsAuthenticated } from "hooks/useIsAuthenticated";
import {
  Button,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { ServiceDrawer } from "features/garage/ServiceDrawer";

const VehicleMaintenance = () => {
  const { t } = useTranslation("common");
  const sessionData = useIsAuthenticated();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { id } = router.query;
  const { data: vehicle, isLoading, isError } = trpc.garage.getVehicleById.useQuery(
    { id: Number(id) },
    { enabled: sessionData?.user !== undefined },
  );

  if (isError) return <Flex justifyContent="center">An error occurred.</Flex>;
  if (isLoading) return <Flex justifyContent="center"><Spinner size="lg" /></Flex>;

  return (
    <>
      <Stack direction="column" spacing="32px">
        <Stack direction="row" justifyContent="space-between">
          <Button
            onClick={router.back}
            colorScheme="primary"
            variant="ghost"
            leftIcon={<ArrowBackIcon />}
          >
            {t("back")}
          </Button>
          {/* onClick open Drawer */}
          <Button
            colorScheme="primary"
            ref={btnRef}
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            {t("garage.vehicle.card.service.ctaAdd")}
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
          {/* Add list services as table */}
        </Stack>
      </Stack>
      <ServiceDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
};

export default VehicleMaintenance;
