import React from "react";
import {
  Box, Grid, GridItem, Spinner,
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

  if (isError) return <Box>An error occurred.</Box>;
  if (isLoading) return <Spinner size="lg" />;

  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={12}>
        {vehicles?.map((vehicle) => (
          <GridItem key={vehicle.id}>
            <VehicleCard key={Number(vehicle.id)} vehicle={vehicle} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};
