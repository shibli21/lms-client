import { Box, Text } from "@chakra-ui/core";
import React from "react";

interface Props {}

const Hero = (props: Props) => {
  return (
    <Box fontSize="7xl" fontWeight="bold" color="blue.800">
      <Text> Reading is</Text>
      <Text>Fascinating</Text>
    </Box>
  );
};

export default Hero;
