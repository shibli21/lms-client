import { Box, Text } from "@chakra-ui/core";
import React from "react";

interface MenuItemsProps {}

const MenuItems: React.FC<MenuItemsProps> = ({ children }) => (
  <Box fontSize="20px" ml={[0, 0, 6, 6]}>
    {children}
  </Box>
);

export default MenuItems;
