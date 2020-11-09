import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  Spinner,
} from "@chakra-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
import BookItemsTable from "../components/BookItemsTable";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { useBookItemsQuery } from "../generated/graphql";

export default function Home() {
  const { data, loading } = useBookItemsQuery();

  if (loading) {
    return (
      <Container>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
    );
  }

  if (!data?.bookItems) {
    return (
      <Container>
        <Box>could not find any post</Box>
      </Container>
    );
  }

  return (
    <Container>
      <Head>
        <title>Library management system</title>
      </Head>
      <Main>
        <Heading align="center">Welcome to</Heading>
        <Heading align="center">Library Management System</Heading>
        <HStack>
          <NextLink href="/addBookItem">
            <Button colorScheme="blue">Add New Book</Button>
          </NextLink>
          <Button colorScheme="blue">Add New Author</Button>
        </HStack>
        <BookItemsTable data={data} />
      </Main>
    </Container>
  );
}
