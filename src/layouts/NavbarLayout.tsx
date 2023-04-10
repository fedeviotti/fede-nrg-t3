import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "components/navbar/Navbar";
import { Footer } from "components/Footer";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "layouts/constants";
import { PAGE_WIDTH } from "constants/layout";

type Props = {
  children: React.ReactNode;
};

export const NavbarLayout = ({ children }: Props) => (
  <>
    <Navbar />
    <Flex
      direction="column"
      alignItems="center"
      py="32px"
      minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
    >
      <Box width={PAGE_WIDTH}>
        {children}
      </Box>
    </Flex>
    <Footer />
  </>
);
