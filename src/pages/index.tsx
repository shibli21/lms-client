import { Container } from "../components/Container";
import { Main } from "../components/Main";
import Head from "next/head";
import React from "react";
import { Heading } from "@chakra-ui/core";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Library management system</title>
      </Head>
      <Main>
        <Heading align="center">Welcome to</Heading>
        <Heading align="center">Library Management System</Heading>
      </Main>
    </Container>
  );
}
