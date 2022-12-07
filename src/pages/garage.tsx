import React from "react";
import {
  Flex, Button, Heading, useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { VehicleList } from "components/garage/VehicleList";
import { VehicleFormModal } from "components/garage/VehicleFormModal";
import { useTranslation } from "react-i18next";
import { NavbarLayout } from "layouts/NavbarLayout";

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
      <Flex flexDirection="column" gap={12} alignItems="center">
        <Heading as="h2" size="xl" fontWeight="semibold">{t("garage.title")}</Heading>
        <Button onClick={onOpen}>{t("garage.cta_add")}</Button>
        <VehicleList />
      </Flex>
      <VehicleFormModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

Garage.getLayout = function getLayout(garage: React.ReactElement) {
  return (
    <NavbarLayout>
      {garage}
    </NavbarLayout>
  );
};

export default Garage;