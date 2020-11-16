import { Box, Button, Heading, HStack, Spinner } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { off } from "process";
import React, { useState } from "react";
import BookItemsTable from "../components/BookItemsTable";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { usePaginatedBookItemsQuery } from "../generated/graphql";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const { data, loading, refetch } = usePaginatedBookItemsQuery({
    variables: {
      limit,
      offset,
      input: {},
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

  if (!data?.paginatedBookItems) {
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

        <Formik
          initialValues={{ author: "", title: "", category: "" }}
          onSubmit={async (values) => {
            setOffset(0);
            refetch({
              input: {
                title: values.title,
                author: values.author,
                category: values.category,
              },
            });
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <HStack spacing={6}>
                <InputField name="title" placeholder="Title" label="Title" />
                <InputField name="author" placeholder="Author" label="Author" />
                <InputField
                  name="category"
                  placeholder="Category"
                  label="Category"
                />
              </HStack>
              <Button
                mt={6}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Search
              </Button>

              <BookItemsTable data={data.paginatedBookItems.bookItems} />
              <HStack>
                {offset > 0 ? (
                  <Button
                    onClick={() => {
                      setOffset(offset - limit);
                      refetch({
                        limit,
                        offset: limit + offset,
                        input: {
                          title: values.title,
                          author: values.author,
                          category: values.category,
                        },
                      });
                    }}
                  >
                    Previous Page
                  </Button>
                ) : null}
                {data.paginatedBookItems.hasMore ? (
                  <Button
                    onClick={() => {
                      setOffset(limit + offset);
                      refetch({
                        limit,
                        offset: limit + offset,
                        input: {
                          title: values.title,
                          author: values.author,
                          category: values.category,
                        },
                      });
                    }}
                  >
                    Next Page
                  </Button>
                ) : null}
              </HStack>
            </Form>
          )}
        </Formik>
        <Footer>Shibli</Footer>
      </Main>
    </Container>
  );
}
