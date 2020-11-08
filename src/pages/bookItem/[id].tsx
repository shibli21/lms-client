import { Box, Heading, HStack, Spinner, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useBookItemQuery } from "../../generated/graphql";

const BookItem = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = useBookItemQuery({
    variables: {
      id: intId,
    },
  });

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

  if (!data?.bookItem) {
    return (
      <Container>
        <Box>could not find any post</Box>
      </Container>
    );
  }

  return (
    <Container>
      <Main>
        <HStack>
          <Text>{data.bookItem.title}</Text>
          <Text>{data.bookItem.category}</Text>
          <Text>{data.bookItem.edition}</Text>
          <Text>{data.bookItem.numberOfCopies}</Text>
          <Text>{data.bookItem.publicationDate}</Text>
          <Text>{data.bookItem.author.authorName}</Text>
        </HStack>
        <Box>
          {data.bookItem.books.map((book) => (
            <HStack>
              <Text>{book.id}</Text>
              <Text>{book.isbnNumber}</Text>
              <Text>{book.rackNumber}</Text>
              <Text>{book.status}</Text>
              <Text>{book.createdAt}</Text>
              <Text>{book.updatedAt}</Text>
            </HStack>
          ))}
        </Box>
      </Main>
    </Container>
  );
};

export default BookItem;
