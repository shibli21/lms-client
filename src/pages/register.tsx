import { Box, Button, Stack } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../components/Container";
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
          {({ isSubmitting }) => (
            <Form>
              <Stack spacing={6}>
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                />
                <InputField name="email" placeholder="Email" label="Email" />
                <InputField
                  name="studentId"
                  placeholder="Student Id"
                  label="Student Id"
                />
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
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Main>
    </Container>
  );
};

export default Register;
