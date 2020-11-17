import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { MeDocument, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <Container>
      <Main maxW={"400px"}>
        <Heading color="cyan.500">Sign up.</Heading>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            studentId: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: {
                options: {
                  email: values.email,
                  password: values.password,
                  name: values.username,
                  studentId: parseInt(values.studentId),
                },
              },
              refetchQueries: [
                {
                  query: MeDocument,
                },
              ],
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <Stack spacing={6}>
                <InputField name="username" placeholder="name" label="Name" />
                <InputField
                  name="email"
                  placeholder="name@domain.com"
                  label="Email"
                />
                <InputField
                  name="studentId"
                  placeholder="Student id"
                  label="Student Id"
                />
                <InputField
                  name="password"
                  placeholder="at least 6 characters"
                  label="Password"
                  type="password"
                />
                <Button
                  mt={6}
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="blue"
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Flex justify="center">
          Already have a account ?
          <Box color="cyan.500" ml={2}>
            <Link href="/login">Sign in</Link>
          </Box>
        </Flex>
      </Main>
      <Footer />
    </Container>
  );
};

export default Register;
