import { Box, Flex, Heading, IconButton, Spinner, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "../../styles/table.module.css";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useBookItemQuery } from "../../generated/graphql";
import BooksTable from "../../components/BooksTable";
import BookItemTable from "../../components/BookItemTable";

const BookItem = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const { data, loading } = useBookItemQuery({
    variables: {
      id: intId,
    },
  });

  if (loading) {
    return (
      <Container>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Container>
    );
  }

  if (!data?.bookItem) {
    return (
      <Container>
        <Box>could not find any post</Box>
      </Container>
    );
  }

  return (
    <Container>
      <Main>
        <Flex
          align={["flex-start", "center"]}
          justifyContent={["space-between", "space-between"]}
          direction={["column", "row", "row", "row"]}
        >
          <Box>
            <Flex align="baseline">
              <Text
                fontSize={["3xl", "3xl", "4xl", "6xl"]}
                color="blue.500"
                fontWeight="bold"
              >
                Dune
              </Text>
              <Text
                fontSize={["md", "md", "xl", "2xl"]}
                fontWeight="semibold"
                ml={4}
              >
                by Frank Herbert
              </Text>
            </Flex>
          </Box>
          <Flex>
            <IconButton
              aria-label="delete"
              icon={<FaTrash />}
              colorScheme="red"
              mr={4}
              size="sm"
            />
            <NextLink
              href="/bookItem/edit/[id]"
              as={`/bookItem/edit/${data.bookItem.id}`}
            >
              <IconButton
                aria-label="edit"
                icon={<FaEdit />}
                colorScheme="blue"
                size="sm"
              />
            </NextLink>
          </Flex>
        </Flex>
        <BookItemTable data={data.bookItem} />
        <Heading color="blue.500">Available Books</Heading>
        <BooksTable data={data.bookItem.books} />
      </Main>
    </Container>
  );
};

export default BookItem;
