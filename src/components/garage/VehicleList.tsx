import React from "react";
import {
  Flex, Grid, GridItem, Spinner,
} from "@chakra-ui/react";
import { trpc } from "utils/trpc";
import { VehicleCard } from "components/garage/VehicleCard";
import { useIsAuthenticated } from "hooks/useIsAuthenticated";

export const VehicleList = () => {
  const sessionData = useIsAuthenticated();
  const { data: vehicles, isLoading, isError } = trpc.garage.getVehiclesByOwner.useQuery(
    { ownerId: sessionData?.user?.id },
    { enabled: sessionData?.user !== undefined },
  );

  if (isError) return <Flex justifyContent="center">An error occurred.</Flex>;
  if (isLoading) return <Flex justifyContent="center"><Spinner size="lg" /></Flex>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={12}>
      {vehicles?.map((vehicle) => (
        <GridItem key={vehicle.id}>
          <VehicleCard key={Number(vehicle.id)} vehicle={vehicle} />
        </GridItem>
      ))}
    </Grid>
  );
};
