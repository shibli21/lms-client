import { Button, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { useIssueBookMutation } from "../generated/graphql";

interface Props {}

const IssueNewBook = (props: Props) => {
  const router = useRouter();
  const [issueBook] = useIssueBookMutation();
  return (
    <Container>
      <Main>
        <Heading>Issue Book</Heading>
        <Formik
          initialValues={{ isbn: "" }}
          onSubmit={async (values) => {
            await issueBook({
              variables: {
                bookISBN: parseInt(values.isbn),
              },
            });
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField
                  name="isbn"
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
