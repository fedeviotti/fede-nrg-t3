import React from "react";
import {
  Button, Heading, useDisclosure, Stack,
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
      <Stack gap={8}>
        <Stack direction="row" justifyContent="space-between">
          <Heading as="h2" size="xl" fontWeight="semibold">{t("garage.title")}</Heading>
          <Button variant="ghost" onClick={onOpen}>{t("garage.cta_add")}</Button>
        </Stack>
        <VehicleList />
      </Stack>
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
