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
import { useVehicleCardImage } from "~/features/garage/hooks/useVehicleCardImage";
import { useVehicleTagColor } from "~/features/garage/hooks/useVehicleTagColor";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

type Props = {
  vehicle: Vehicle & { type: { name: string | null } };
};

export const VehicleCard = ({ vehicle }: Props) => {
  const { t } = useTranslation("common");
  const imageSrc = useVehicleCardImage(vehicle.type.name);
  const tagColor = useVehicleTagColor(vehicle.type.name);

  return (
    <Card>
      <CardBody display="flex" flexDirection="column">
        <Image
          src={imageSrc}
          alt="Bicycle"
          borderRadius="lg"
          objectFit="cover"
          maxW={{ base: "100%", md: "300px" }}
          alignSelf="center"
        />
        <Stack mt="16px" direction="column">
          <Heading size="md">
            {vehicle.name}
          </Heading>
          <Text noOfLines={2} minH="48px">
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
        <Link href={`/garage/vehicles/${vehicle.id}`}>
          <Button
            colorScheme="primary"
            rightIcon={<ArrowForwardIcon />}
          >
            {t("garage.vehicle.card.ctaServices")}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
