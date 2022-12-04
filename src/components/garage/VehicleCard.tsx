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
import { useVehicleCardImage } from "components/garage/hooks/useVehicleCardImage";
import { useVehicleTagColor } from "components/garage/hooks/useVehicleTagColor";
import { useTranslation } from "react-i18next";

type Props = {
  vehicle: Vehicle & { type: { name: string | null } };
};

export const VehicleCard = ({ vehicle }: Props) => {
  const { t } = useTranslation("common");
  const imageSrc = useVehicleCardImage(vehicle.type.name);
  const tagColor = useVehicleTagColor(vehicle.type.name);

  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={imageSrc}
          alt="Bicycle"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {vehicle.name}
          </Heading>
          <Text>
            {vehicle.description}
          </Text>
          <Tag
            size="md"
            key="md"
            variant="solid"
            colorScheme={tagColor}
            textTransform="uppercase"
            alignSelf="flex-end"
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
