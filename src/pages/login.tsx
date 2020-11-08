import { Box, Button, HStack, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
import InputField from "../components/InputField";
import { Main } from "../components/Main";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const router = useRouter();

  return (
    <Container>
      <Main maxW={"400px"}>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            console.log(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField name="email" placeholder="Email" label="Email" />
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                />
              </Stack>
              <Button
                mt={6}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="blue"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Container>
  );
};

export default Login;
