import { ChakraProvider } from "@chakra-ui/core";
import theme from "../theme/theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";

function MyApp({ Component, pageProps }) {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
