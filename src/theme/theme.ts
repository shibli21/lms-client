import { extendTheme } from "@chakra-ui/core";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        fontWeight: "normal",
        textTransform: "capitalize",
      },

      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "cyan.300" : "cyan.500",
        }),
        outline: (props) => ({
          borderColor: props.colorMode === "dark" ? "gray.100" : "gray.900",
        }),
      },
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            borderRadius: 0,
          },
        }),
      },
    },
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontFamily: "poppins",
        color: props.colorMode === "dark" ? "white" : "gray.800",
        bg: props.colorMode === "dark" ? "gray.800" : "white",
      },
    }),
  },
});

export default theme;
