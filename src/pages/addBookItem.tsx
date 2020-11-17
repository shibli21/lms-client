import { Stack, Button } from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { Router, useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import {
  BookItemDocument,
  BookItemsDocument,
  useAddBookItemMutation,
} from "../generated/graphql";

interface Props {}

const AddBookItem = (props: Props) => {
  const router = useRouter();
  const [addBookItem] = useAddBookItemMutation();

  return (
    <Container>
      <Main maxW={"400px"}>
        <Formik
          initialValues={{ title: "", category: "", edition: "", authorId: "" }}
          onSubmit={async (values) => {
            const { data } = await addBookItem({
              variables: {
                addBookItem: {
                  authorId: parseInt(values.authorId),
                  category: values.category,
                  edition: values.edition,
                  title: values.title,
                },
              },
              refetchQueries: [
                {
                  query: BookItemsDocument,
                },
              ],
            });
            router.push(`/bookItem/edit/${data.addBookItem.id}`);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField name="title" placeholder="Title" label="Title" />
                <InputField
                  name="category"
                  placeholder="Category"
                  label="Category"
                />
                <InputField
                  name="edition"
                  placeholder="Edition"
                  label="Editon"
                />
                <InputField
                  name="authorId"
                  placeholder="Author"
                  label="Author"
                />
              </Stack>
              <Button
                mt={6}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Add Book Item
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
      <Footer />
    </Container>
  );
};

export default AddBookItem;
