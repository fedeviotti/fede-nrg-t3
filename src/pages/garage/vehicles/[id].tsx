import React from "react";
import { useRouter } from "next/router";
import { trpc } from "~/utils/trpc";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";
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
import { ServiceDrawer } from "~/features/garage/ServiceDrawer";
import { ServiceCard } from "~/features/garage/ServiceCard";

const VehicleMaintenance = () => {
  const { t } = useTranslation("common");
  const sessionData = useIsAuthenticated();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const { id } = router.query;
  const {
    data: vehicle,
    isLoading: isLoadingVehicle,
    isError: isErrorVehicle,
  } = trpc.garage.getVehicleById.useQuery(
    { id: Number(id) },
    { enabled: sessionData?.user !== undefined },
  );
  const {
    data: services,
    isLoading: isLoadingServices,
    isError: isErrorServices,
  } = trpc.garage.getServicesByVehicleId.useQuery({
    id: Number(id),
  }, {
    enabled: id !== undefined,
  });

  if (isErrorVehicle || isErrorServices) return <Flex justifyContent="center">An error occurred.</Flex>;
  if (isLoadingVehicle || isLoadingServices) return <Flex justifyContent="center"><Spinner size="lg" /></Flex>;

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
          <Button
            colorScheme="primary"
            ref={btnRef}
            leftIcon={<AddIcon />}
            onClick={onOpen}
          >
            {t("garage.vehicle.card.service.ctaAdd")}
          </Button>
        </Stack>
        <Stack direction="column" spacing={5}>
          <Heading size="md">
            {vehicle?.name}
          </Heading>
          <Text>
            {vehicle?.description}
          </Text>
          {/* Add Image  */}
          {services.map((service) => (<ServiceCard key={service.id} service={service} />))}
        </Stack>
      </Stack>
      <ServiceDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} vehicleId={Number(id)} />
    </>
  );
};

export default VehicleMaintenance;
