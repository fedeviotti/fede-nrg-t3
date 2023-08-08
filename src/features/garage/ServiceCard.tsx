import * as React from "react";
import type { Service } from "@prisma/client";
import {
  Card, CardHeader,
  CardBody, Heading, Text, Grid, Divider,
} from "@chakra-ui/react";

type Props = {
  service: Service;
};

export const ServiceCard = ({ service }: Props) => (
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
              Description
            </Text>
            <Text pt="2" fontSize="sm">
              {service.description}
            </Text>
          </>
        )}
        <Text pt="2" fontSize="sm">
          Price
        </Text>
        <Text pt="2" fontSize="sm">
          {`${service.price} €`}
        </Text>
        <Text pt="2" fontSize="sm">
          Data di creazione
        </Text>
        <Text pt="2" fontSize="sm">
          {service.createdAt.toString()}
        </Text>
      </Grid>
    </CardBody>
  </Card>
);
