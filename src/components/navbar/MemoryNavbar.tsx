import React from "react";
import {
  Flex, HStack, Image, useColorMode, useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import MEMORY_LOGO_LIGHT from "assets/MEMORY_LOGO_LIGHT.png";
import MEMORY_LOGO_DARK from "assets/MEMORY_LOGO_DARK.png";
import { PAGE_WIDTH } from "constants/layout";

const MemoryNavbar = () => {
  const { colorMode } = useColorMode();
  const logoSrc = useColorModeValue(MEMORY_LOGO_LIGHT.src, MEMORY_LOGO_DARK.src);

  return (
    <Flex
      width="100%"
      justifyContent="center"
      boxShadow={colorMode === "light" ? "rgba(0, 0, 0, .05) 0px 1px 2px" : "rgba(255, 255, 255, .1) 0px 1px 2px"}
    >
      <Flex
        width={PAGE_WIDTH}
        py={4}
        justifyContent="space-between"
        boxShadow={colorMode === "light" ? "rgba(0, 0, 0, .05) 0px 1px 2px" : "rgba(255, 255, 255, .1) 0px 1px 2px"}
      >
        <Image
          alt="Memory Logo"
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
        <HStack spacing={8}>
          <Link href="/dashboard">Dashboard</Link>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default MemoryNavbar;
