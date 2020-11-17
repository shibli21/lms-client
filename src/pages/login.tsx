import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import InputField from "../components/InputField";
import { Main } from "../components/Main";
import { MeDocument, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const router = useRouter();

  const [login] = useLoginMutation();

  return (
    <Container>
      <Main maxW={"400px"}>
        <Heading color="cyan.500">Sign in.</Heading>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                email: values.email,
                password: values.password,
              },
              refetchQueries: [
                {
                  query: MeDocument,
                },
              ],
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField
                  name="email"
                  placeholder="name@domain.com"
                  label="Email"
                />
                <InputField
                  name="password"
                  placeholder="at least 6 characters"
                  label="Password"
                  type="password"
                />
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  colorScheme="blue"
                >
                  Login
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
        <Flex justify="center">
          Don't have a account ?
          <Box color="cyan.500" ml={2}>
            <Link href="/register">Sign up</Link>
          </Box>
        </Flex>
      </Main>
      <Footer />
    </Container>
  );
};

export default Login;
