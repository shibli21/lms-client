import { Button, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { useReturnBookMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface Props {}

const ReturnBook = (props: Props) => {
  const router = useRouter();
  const [returnBook] = useReturnBookMutation();
  return (
    <Container>
      <Main>
        <Heading>Return Book</Heading>
        <Formik
          initialValues={{
            isbn: `${router.query.isbn ? router.query.isbn : ""}`,
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await returnBook({
              variables: {
                bookISBN: parseInt(values.isbn),
              },
            });
            if (response.data.returnBook.errors) {
              setErrors(toErrorMap(response.data.returnBook.errors));
            } else {
              router.push("/");
            }
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
                Return Book
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Container>
  );
};

export default ReturnBook;
