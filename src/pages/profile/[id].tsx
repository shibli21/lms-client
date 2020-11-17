import { Box, Heading, Text } from "@chakra-ui/core";
import { useRouter } from "next/router";
import React from "react";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import IssuedBookTable from "../../components/IssuedBookTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Main } from "../../components/Main";
import ProfileTable from "../../components/ProfileTable";
import { useMeQuery } from "../../generated/graphql";
import { useGetIntId } from "../../Hooks/useGetIntId";

interface Props {}

const Profile = (props: Props) => {
  const id = useGetIntId();
  const { data, loading } = useMeQuery();
  const router = useRouter();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data.me) {
    router.replace("/");
  }

  return (
    <Container>
      <Main>
        <ProfileTable data={data?.me} />
        <Text fontSize="3xl" fontWeight="semibold">
          Issued Books List
        </Text>
        <IssuedBookTable />
      </Main>
      <Footer />
    </Container>
  );
};

export default Profile;
