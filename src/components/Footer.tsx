import { Flex, FlexProps } from "@chakra-ui/core";

export const Footer = (props: FlexProps) => (
  <Flex as="footer" justify="center" align="center" py="6rem" {...props}>
    All rights reserve by shibli &copy;
  </Flex>
);
