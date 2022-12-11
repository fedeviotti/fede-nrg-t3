import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import MemoryNavbar from "components/navbar/MemoryNavbar";
import { Footer } from "components/Footer";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "layouts/constants";
import { PAGE_WIDTH } from "constants/layout";

type Props = {
  children: React.ReactNode;
};

export const MemoryLayout = ({ children }: Props) => (
  <>
    <MemoryNavbar />
    <Flex
      direction="column"
      alignItems="center"
      py={8}
      minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
    >
      <Box width={PAGE_WIDTH}>
        {children}
      </Box>
    </Flex>
    <Footer />
  </>
);
