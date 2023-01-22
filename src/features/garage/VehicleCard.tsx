import React from "react";
import {
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  Card,
  CardBody,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import type { Vehicle } from "@prisma/client";
import { useVehicleCardImage } from "features/garage/hooks/useVehicleCardImage";
import { useVehicleTagColor } from "features/garage/hooks/useVehicleTagColor";
import { useTranslation } from "react-i18next";

type Props = {
  vehicle: Vehicle & { type: { name: string | null } };
};

export const VehicleCard = ({ vehicle }: Props) => {
  const { t } = useTranslation("common");
  const imageSrc = useVehicleCardImage(vehicle.type.name);
  const tagColor = useVehicleTagColor(vehicle.type.name);

  return (
    <Card maxW="sm" minH="md">
      <CardBody display="flex" flexDirection="column">
        <Image
          src={imageSrc}
          alt="Bicycle"
          borderRadius="lg"
        />
        <Stack mt="6" flexGrow={1} justifyContent="space-between">
          <Stack>
            <Heading size="md">
              {vehicle.name}
            </Heading>
            <Text noOfLines={3}>
              {vehicle.description}
            </Text>
          </Stack>
          <Tag
            size="md"
            key="md"
            variant="solid"
            colorScheme={tagColor}
            textTransform="uppercase"
            alignSelf="flex-end"
            justifySelf="flex-end"
          >
            {vehicle.type.name}
          </Tag>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="center">
        <Button variant="ghost" colorScheme="primary">
          {t("garage.vehicle.card.cta_maintenance")}
        </Button>
      </CardFooter>
    </Card>
  );
};
