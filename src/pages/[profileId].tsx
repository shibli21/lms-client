import { Box, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import IssuedBookTable from "../components/IssuedBookTable";
import { Main } from "../components/Main";
import { useMeQuery } from "../generated/graphql";
import { useGetIntId } from "../Hooks/useGetIntId";

interface Props {}

const Profile = (props: Props) => {
  const id = useGetIntId();
  const { data, loading } = useMeQuery();

  if (!data) {
    return <Box>Failed to fetch data</Box>;
  }

  return (
    <Container>
      <Main>
        <Heading color="blue.500">{data.me.username}</Heading>
        <Text fontSize="3xl" fontWeight="semibold">
          Issued Books List
        </Text>
        <IssuedBookTable />
      </Main>
      <Footer>&copy; All rights reserved by shibli</Footer>
    </Container>
  );
};

export default Profile;
