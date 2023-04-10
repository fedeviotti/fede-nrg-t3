import React from "react";
import { Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <Flex py="16px" justifyContent="center" alignItems="center">
      {t("footer")}
    </Flex>
  );
};
