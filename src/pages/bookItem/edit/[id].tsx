import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Container } from "../../../components/Container";
import { Main } from "../../../components/Main";
import {
  BookItemDocument,
  useAddCopiesOfBookToLibraryMutation,
  useBookItemQuery,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../Hooks/useGetIntId";
import styles from "../../../styles/table.module.css";
import NextLink from "next/link";
import BookItemTable from "../../../components/BookItemTable";
import BooksTable from "../../../components/BooksTable";
import { Formik, Form } from "formik";
import InputField from "../../../components/InputField";
import { Footer } from "../../../components/Footer";

interface Props {}

const EditBookItem = (props: Props) => {
  const intId = useGetIntId();
  const { data, loading } = useBookItemQuery({
    variables: {
      id: intId,
    },
  });

  const [addCopy] = useAddCopiesOfBookToLibraryMutation();

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
        <Flex align="baseline">
          <Text
            fontSize={["3xl", "3xl", "4xl", "6xl"]}
            color="blue.500"
            fontWeight="bold"
          >
            {data.bookItem.title}
          </Text>
          <Text
            fontSize={["md", "md", "xl", "2xl"]}
            fontWeight="semibold"
            ml={4}
          >
            by {data.bookItem.author.authorName}
          </Text>
        </Flex>
        <Formik
          initialValues={{ rackNumber: "", isbnNumber: "" }}
          onSubmit={async (values) => {
            const { data } = await addCopy({
              variables: {
                bookInput: {
                  bookItemId: intId,
                  isbnNumber: parseInt(values.isbnNumber),
                  rackNumber: values.rackNumber,
                },
              },
              refetchQueries: [
                {
                  query: BookItemDocument,
                  variables: {
                    id: intId,
                  },
                },
              ],
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField
                  name="rackNumber"
                  placeholder="Rack Number"
                  label="Rack Number"
                />
                <InputField
                  name="isbnNumber"
                  placeholder="ISBN Number"
                  label="ISBN Number"
                />
              </Stack>
              <Button
                mt={6}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Add Copy
              </Button>
            </Form>
          )}
        </Formik>
        <BookItemTable data={data.bookItem} />
        <Heading color="blue.500">Available Books</Heading>
        <BooksTable data={data.bookItem.books} />
      </Main>
      <Footer></Footer>
    </Container>
  );
};

export default EditBookItem;
