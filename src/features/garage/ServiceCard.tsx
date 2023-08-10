import * as React from "react";
import type { Service } from "@prisma/client";
import {
  Card, CardHeader,
  CardBody, Heading, Text, Grid, Divider,
} from "@chakra-ui/react";
import { addDays, format } from "date-fns";
import { DATE_FORMAT } from "~/constants/date";
import { useTranslation } from "react-i18next";

type Props = {
  service: Service;
};

export const ServiceCard = ({ service }: Props) => {
  const { t } = useTranslation("common");
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{service.name}</Heading>
      </CardHeader>
      <Divider color="gray.200" />
      <CardBody>
        <Grid templateColumns="10rem 1fr" gap={4}>
          { service.description && (
            <>
              <Text pt="2" fontSize="sm">
                {t("garage.vehicle.service.card.fields.description")}
              </Text>
              <Text pt="2" fontSize="sm">
                {service.description}
              </Text>
            </>
          )}
          <Text pt="2" fontSize="sm">
            {t("garage.vehicle.service.card.fields.price")}
          </Text>
          <Text pt="2" fontSize="sm">
            {`${service.price} €`}
          </Text>
          <Text pt="2" fontSize="sm">
            {t("garage.vehicle.service.card.fields.createdAt")}
          </Text>
          <Text pt="2" fontSize="sm">
            {format(service.createdAt, DATE_FORMAT)}
          </Text>
          <Text pt="2" fontSize="sm">
            {t("garage.vehicle.service.card.fields.expiryAt")}
          </Text>
          <Text pt="2" fontSize="sm">
            {service.duration === 0
              ? t("garage.vehicle.service.card.fields.noExpiry")
              : format(addDays(service.createdAt, service.duration), DATE_FORMAT)}
          </Text>
        </Grid>
      </CardBody>
    </Card>
  );
};
