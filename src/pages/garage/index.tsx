import React from "react";
import {
  Button, Heading, useDisclosure, Stack, Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { VehicleList } from "features/garage/VehicleList";
import { VehicleFormModal } from "features/garage/VehicleFormModal";

const Garage = () => {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>{t("garage.title")}</title>
        <meta name="description" content={t("garage.title") || "Garage"} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <Stack gap="32px">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column">
            <Heading as="h2" size="xl" fontWeight="semibold">{t("garage.title")}</Heading>
            <Text size="md">{t("garage.description")}</Text>
          </Stack>
          <Button colorScheme="primary" onClick={onOpen}>{t("garage.ctaAdd")}</Button>
        </Stack>
        <VehicleList />
      </Stack>
      <VehicleFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Garage;
