import React from "react";
import { Box } from "@chakra-ui/react";
import { NavbarLayout } from "layouts/NavbarLayout";

const Crypto = () => (
  <Box>
    Crypto
  </Box>
);

Crypto.getLayout = function getLayout(crypto: React.ReactElement) {
  return (
    <NavbarLayout>
      {crypto}
    </NavbarLayout>
  );
};

export default Crypto;
