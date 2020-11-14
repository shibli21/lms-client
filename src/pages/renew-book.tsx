import { Button, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import {
  IssuedBookForCurrentUserDocument,
  useRenewBookMutation,
} from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface Props {}

const RenewBook = (props: Props) => {
  const router = useRouter();
  const [renewBook] = useRenewBookMutation();
  console.log(router.query.isbn);

  return (
    <Container>
      <Main>
        <Heading>Renew Book</Heading>
        <Formik
          initialValues={{
            isbn: `${router.query.isbn ? router.query.isbn : ""}`,
            days: "2",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await renewBook({
              variables: {
                ISBNNumber: parseInt(values.isbn),
                days: parseInt(values.days),
              },
              refetchQueries: [
                {
                  query: IssuedBookForCurrentUserDocument,
                },
              ],
            });
            if (response.data.renewBook.errors) {
              setErrors(toErrorMap(response.data.renewBook.errors));
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
                <InputField
                  name="days"
                  label="Number Of Days"
                  placeholder="Number Of Days"
                />
              </Stack>
              <Button
                mt={6}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Renew Book
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Container>
  );
};

export default RenewBook;
