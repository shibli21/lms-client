import {
  Box,
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Stack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Logo from "./Logo";
import MenuItems from "./MenuItems";

const NavBar = (props: ChakraProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Router = useRouter();

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const NavLinks = (
    <>
      <MenuItems>
        <DarkModeSwitch />
      </MenuItems>
      <MenuItems>
        <NextLink href="/login">Login</NextLink>
      </MenuItems>
      <MenuItems>
        <NextLink href="/register">Register</NextLink>
      </MenuItems>
    </>
  );

  return (
    <Box
      top={0}
      position="sticky"
      zIndex={100}
      boxShadow="xs"
      bg={!isDark ? "#FFFFFF" : "#1A202C"}
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        maxW="1024px"
        mx="auto"
        {...props}
      >
        <NextLink href="/">
          <Box cursor="pointer">
            <Logo />
          </Box>
        </NextLink>
        <Flex
          display={["none", "none", "inherit", "inherit"]}
          align="center"
          justify="center"
        >
          {NavLinks}
        </Flex>
        <Box display={["block", "block", "none", "none"]}>
          <>
            <Box color="primary" onClick={onOpen}>
              <FaBars size="40px" />
            </Box>
            <Drawer
              size="xs"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton m={4}>
                  <Box color="primary">
                    <RiCloseFill size="60px" />
                  </Box>
                </DrawerCloseButton>
                <DrawerBody pt="150px">
                  <Stack spacing="24px" align="center">
                    {NavLinks}
                  </Stack>
                </DrawerBody>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
