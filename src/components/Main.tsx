import { Stack, StackProps } from "@chakra-ui/core";

export const Main = (props: StackProps) => (
  <Stack
    spacing="1.5rem"
    width="100%"
    maxWidth="1024px"
    px="1rem"
    pt="1rem"
    css={{
      ":first-of-type": {
        marginTop: "30px",
      },
    }}
    {...props}
  />
);
