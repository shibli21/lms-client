import {
  Box,
  Button,
  FormLabel,
  Heading,
  HStack,
  Input,
  Spinner,
} from "@chakra-ui/core";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import React, { useState } from "react";
import BookItemsTable from "../components/BookItemsTable";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { usePaginatedBookItemsQuery } from "../generated/graphql";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const formik = useFormik({
    initialValues: {
      author: "",
      title: "",
      category: "",
    },
    onSubmit: async (values) => {
      setOffset(0);
      await refetch({
        input: {
          author: values.author,
          title: values.title,
          category: values.category,
        },
      });
    },
  });

  const { data, loading, refetch } = usePaginatedBookItemsQuery({
    variables: {
      input: {},
      limit,
      offset,
    },
  });

  console.log(data);

  const fetchPrevPage = async () => {
    if (offset - limit < limit) {
      setOffset(0);
    }
    setOffset(offset - limit);
    await refetch({
      input: {
        author: formik.values.author,
        title: formik.values.title,
        category: formik.values.category,
      },
      limit,
      offset,
    });
  };
  const fetchNextPage = async () => {
    setOffset(offset + limit);
    console.log(formik.values.title);

    await refetch({
      input: {
        author: formik.values.author,
        title: formik.values.title,
        category: formik.values.category,
      },
      limit,
      offset,
    });
  };

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
        <HStack>
          <form onSubmit={formik.handleSubmit}>
            <HStack spacing={6}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input
                id="title"
                name="title"
                type="search"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <FormLabel htmlFor="author">Author</FormLabel>
              <Input
                id="author"
                name="author"
                type="search"
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              <FormLabel htmlFor="category">Category</FormLabel>
              <Input
                id="category"
                name="category"
                type="search"
                onChange={formik.handleChange}
                value={formik.values.category}
              />
            </HStack>
            <Button
              mt={6}
              type="submit"
              isLoading={formik.isSubmitting}
              colorScheme="blue"
            >
              Search
            </Button>
          </form>
        </HStack>

        <BookItemsTable data={data.paginatedBookItems.bookItems} />
        <HStack>
          {offset > 0 ? (
            <Button onClick={() => fetchPrevPage()}>Previous Page</Button>
          ) : null}
          {data.paginatedBookItems.hasMore ? (
            <Button onClick={() => fetchNextPage()}>Next Page</Button>
          ) : null}
        </HStack>
      </Main>
      <Footer> copy; All rights reserve by shibli</Footer>
    </Container>
  );
}
