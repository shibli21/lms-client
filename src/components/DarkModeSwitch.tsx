import { Icon, useColorMode } from "@chakra-ui/core";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Icon
      as={isDark ? FaSun : FaMoon}
      onClick={toggleColorMode}
      cursor="pointer"
    />
  );
};
