import React from "react";
import {
  Box, Grid, GridItem,
} from "@chakra-ui/react";
import { VehicleCard } from "components/garage/VehicleCard";
import type { ExtendedVehicle } from "components/garage/types/vehicle";

export const VehicleList = () => {
  const vehicles: ExtendedVehicle[] = [];

  // if (error) return <Box>An error occurred.</Box>;
  if (!vehicles) return <Box>Loading ...</Box>;

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={12}>
      {/* <pre>{JSON.stringify(vehicles, null, 2)}</pre> */}
      {vehicles?.map((vehicle) => (
        <GridItem key={vehicle.id}>
          <VehicleCard key={Number(vehicle.id)} vehicle={vehicle} />
        </GridItem>
      ))}
    </Grid>
  );
};
