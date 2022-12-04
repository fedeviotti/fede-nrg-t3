import React from "react";
import {
  Flex, Center, Heading, Image, Stack, Tag, useColorModeValue,
} from "@chakra-ui/react";
import type { Vehicle } from "@prisma/client";
import { useVehicleCardImage } from "components/garage/hooks/useVehicleCardImage";
import { useVehicleTagColor } from "components/garage/hooks/useVehicleTagColor";

type Props = {
  vehicle: Vehicle & {type: {name: string | null}};
}

export const VehicleCard = ({vehicle}: Props) => {
  const imageSrc = useVehicleCardImage(vehicle.type.name);
  const tagColor = useVehicleTagColor(vehicle.type.name);

  return (
    <Center>
      <Flex
        direction="column"
        alignItems="center"
        role="group"
        p={6}
        minWidth="200px"
        bg={useColorModeValue("white", "gray.800")}
        pos="relative"
        zIndex={1}
        border="1px solid"
        borderColor={useColorModeValue("blackAlpha.300", "whiteAlpha.300")}
        borderRadius="lg"
      >
        <Image
          boxSize="150px"
          alt="Vehicle detail card"
          rounded="lg"
          objectFit="cover"
          src={imageSrc}
        />
        <Stack pt={8} align="center" spacing={6}>
          {vehicle.type.name
            && (
            <Tag size="md" key="md" variant="solid" colorScheme={tagColor} textTransform="uppercase">
              {vehicle.type.name}
            </Tag>
            )}
          <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
            {vehicle.name}
          </Heading>
        </Stack>
      </Flex>
    </Center>
  );
};
