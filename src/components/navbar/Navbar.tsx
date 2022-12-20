import React from "react";
import {
  Avatar, Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton, MenuDivider,
  MenuItem, MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  CloseIcon, MoonIcon, SettingsIcon, SunIcon,
} from "@chakra-ui/icons";
import NextLink from "next/link";
import LOGO_LIGHT from "assets/FEDENRG_LOGO_LIGHT.png";
import LOGO_DARK from "assets/FEDENRG_LOGO_DARK.png";
import { useTranslation } from "react-i18next";
import { signOut } from "next-auth/react";
import { PAGE_WIDTH } from "constants/layout";

const Navbar = () => {
  const { i18n } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const logoSrc = useColorModeValue(LOGO_LIGHT.src, LOGO_DARK.src);

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
      >
        <Image
          alt="FedeNrg Logo"
          height={10}
          objectFit="cover"
          src={logoSrc}
        />
        <HStack spacing={8}>
          <NextLink href="/dashboard">
            <Button
              fontWeight="normal"
              variant="ghost"
            >
              Dashboard
            </Button>
          </NextLink>
          <NextLink href="/garage">
            <Button
              fontWeight="normal"
              variant="ghost"
            >
              Garage
            </Button>
          </NextLink>
          <NextLink href="/crypto">
            <Button
              fontWeight="normal"
              variant="ghost"
            >
              Crypto
            </Button>
          </NextLink>
          <NextLink href="/memory">
            <Button
              fontWeight="normal"
              variant="ghost"
            >
              Memory
            </Button>
          </NextLink>
        </HStack>
        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Settings"
              icon={<SettingsIcon />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
              >
                Toggle Color Mode
              </MenuItem>
              <MenuDivider />
              <MenuOptionGroup
                defaultValue="it"
                title="Language"
                type="radio"
              >
                <MenuItemOption
                  value="it"
                  onClick={() => i18n.changeLanguage("it")}
                >
                  Italian
                </MenuItemOption>
                <MenuItemOption
                  value="en"
                  onClick={() => i18n.changeLanguage("en")}
                >
                  English
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuItem
                icon={<CloseIcon />}
                onClick={() => signOut()}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
          <Avatar size="sm" name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
