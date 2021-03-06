import {
  Box,
  Button,
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
  Text,
  useColorMode,
  useDisclosure,
  useToken,
} from "@chakra-ui/core";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { DarkModeSwitch } from "./DarkModeSwitch";
import Logo from "./Logo";
import MenuItems from "./MenuItems";

const NavBar = (props: ChakraProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Router = useRouter();

  const { data, loading } = useMeQuery();
  const [logout] = useLogoutMutation();

  let NavLinks: any = null;

  if (loading) {
  } else if (!data?.me) {
    NavLinks = (
      <>
        <MenuItems>
          <DarkModeSwitch />
        </MenuItems>

        <MenuItems>
          <NextLink href="/register">Register</NextLink>
        </MenuItems>
        <MenuItems>
          <NextLink href="/login">
            <Button variant="outline">Login</Button>
          </NextLink>
        </MenuItems>
      </>
    );
  } else {
    NavLinks = (
      <>
        <MenuItems>
          <DarkModeSwitch />
        </MenuItems>
        <MenuItems>
          <NextLink href="/return-book">Return Book</NextLink>
        </MenuItems>
        <MenuItems>
          <NextLink href="/issue-new-book">Issue Book</NextLink>
        </MenuItems>
        <MenuItems>
          <NextLink href="/">
            <Box
              cursor="pointer"
              onClick={() =>
                logout({
                  refetchQueries: [{ query: MeDocument }],
                })
              }
            >
              Logout
            </Box>
          </NextLink>
        </MenuItems>
        <MenuItems>
          <NextLink href={`profile/${data.me.username}`}>
            <Text fontSize="xl" cursor="pointer">
              <Button variant="outline">{data.me.username}</Button>
            </Text>
          </NextLink>
        </MenuItems>
      </>
    );
  }

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box
      top={0}
      position="sticky"
      zIndex={100}
      // boxShadow="sm"
      boxShadow={` ${
        !isDark ? "rgba(149, 157, 165, 0.2)" : "rgba(0, 0, 0, 0.2)"
      } 0px 8px 24px`}
      bg={!isDark ? "white" : "gray.800"}
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
