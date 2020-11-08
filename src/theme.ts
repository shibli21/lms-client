import { extendTheme } from "@chakra-ui/core";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    }),
  },
});

export default theme;
