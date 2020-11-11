import { Button, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { useIssueBookMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface Props {}

const IssueNewBook = (props: Props) => {
  const router = useRouter();
  const [issueBook] = useIssueBookMutation();
  return (
    <Container>
      <Main>
        <Heading>Issue Book</Heading>
        <Formik
          initialValues={{ book: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await issueBook({
              variables: {
                bookISBN: parseInt(values.book),
              },
            });
            if (response.data.borrowBook.errors) {
              setErrors(toErrorMap(response.data.borrowBook.errors));
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField
                  name="book"
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
                Issue Book
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Container>
  );
};

export default IssueNewBook;
