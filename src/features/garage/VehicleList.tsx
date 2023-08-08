import React from "react";
import {
  Flex, GridItem, SimpleGrid, Spinner,
} from "@chakra-ui/react";
import { trpc } from "~/utils/trpc";
import { useIsAuthenticated } from "~/hooks/useIsAuthenticated";
import { VehicleCard } from "./VehicleCard";

export const VehicleList = () => {
  const sessionData = useIsAuthenticated();
  const { data: vehicles, isLoading, isError } = trpc.garage.getVehiclesByOwner.useQuery(
    { ownerId: sessionData?.user?.id },
    { enabled: sessionData?.user !== undefined },
  );

  if (isError) return <Flex justifyContent="center">An error occurred.</Flex>;
  if (isLoading) return <Flex justifyContent="center"><Spinner size="lg" /></Flex>;

  return (
    <SimpleGrid minChildWidth="300px" spacing="32px">
      {vehicles?.map((vehicle) => (
        <GridItem key={vehicle.id}>
          <VehicleCard
            key={Number(vehicle.id)}
            vehicle={vehicle}
          />
        </GridItem>
      ))}
    </SimpleGrid>
  );
};
