import { Box, Heading, Spinner } from "@chakra-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import React from "react";
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
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Edition</th>
              <th>Category</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            {data.bookItems.map((b) => (
              <tr>
                <td>
                  <NextLink href="/bookItem/[id]" as={`/bookItem/${b.id}`}>
                    {b.title}
                  </NextLink>
                </td>
                <td>{b.author.authorName}</td>
                <td>{b.edition}</td>
                <td>{b.category}</td>
                <td>{b.numberOfCopies}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Main>
    </Container>
  );
}
