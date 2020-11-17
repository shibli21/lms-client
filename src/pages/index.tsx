import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/core";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import React, { useState } from "react";
import BookItemsTable from "../components/BookItemsTable";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero";
import LoadingSpinner from "../components/LoadingSpinner";
import { Main } from "../components/Main";
import { usePaginatedBookItemsQuery } from "../generated/graphql";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    author: "",
    category: "",
  });
  const formik = useFormik({
    initialValues: {
      author: "",
      title: "",
      category: "",
    },
    onSubmit: async (values) => {
      setOffset(0);
      await refetch({
        limit,
        offset,
        input: {
          author: values.author.trim(),
          title: values.title.trim(),
          category: values.category.trim(),
        },
      });
      setSearchFilter({
        title: values.title.trim(),
        author: values.author.trim(),
        category: values.category.trim(),
      });
    },
  });

  const { data, loading, refetch } = usePaginatedBookItemsQuery({
    variables: {
      input: {
        title: searchFilter.title.trim(),
        author: searchFilter.author.trim(),
        category: searchFilter.category.trim(),
      },
      limit,
      offset,
    },
  });

  const fetchPrevPage = async () => {
    if (offset - limit < limit) {
      setOffset(0);
    }
    setOffset(offset - limit);
    await refetch({
      offset,
    });
  };
  const fetchNextPage = async () => {
    setOffset(offset + limit);
    refetch({
      offset,
    });
  };

  return (
    <Container>
      <Head>
        <title>Library management system</title>
      </Head>
      <Main>
        <HStack>
          <NextLink href="/addBookItem">
            <Button colorScheme="blue">Add New Book</Button>
          </NextLink>
          <Button colorScheme="blue">Add New Author</Button>
        </HStack>
        <HStack>
          <form onSubmit={formik.handleSubmit}>
            <Flex
              align={["flex-start", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              w="100%"
            >
              <Box mr={6}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="search"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  variant="outline"
                />
              </Box>
              <Box mr={6}>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                  id="author"
                  name="author"
                  type="search"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                />
              </Box>
              <Box mr={6}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Input
                  id="category"
                  name="category"
                  type="search"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                />
              </Box>
              <Button
                mt={6}
                type="submit"
                isLoading={formik.isSubmitting}
                colorScheme="blue"
              >
                Search
              </Button>
            </Flex>
          </form>
        </HStack>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <BookItemsTable data={data.paginatedBookItems.bookItems} />
        )}
        <HStack>
          {offset > 0 ? (
            <Button onClick={() => fetchPrevPage()} colorScheme="blue">
              Previous Page
            </Button>
          ) : null}
          {data?.paginatedBookItems.hasMore ? (
            <Button onClick={() => fetchNextPage()} colorScheme="blue">
              Next Page
            </Button>
          ) : null}
        </HStack>
      </Main>
      <Footer />
    </Container>
  );
}
