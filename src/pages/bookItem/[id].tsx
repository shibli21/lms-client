import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  FaArrowCircleLeft,
  FaArrowLeft,
  FaBackward,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import styles from "../../styles/table.module.css";
import { Container } from "../../components/Container";
import { Main } from "../../components/Main";
import { useBookItemQuery } from "../../generated/graphql";
import BooksTable from "../../components/BooksTable";
import BookItemTable from "../../components/BookItemTable";
import { Footer } from "../../components/Footer";
import LoadingSpinner from "../../components/LoadingSpinner";

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
    return <LoadingSpinner />;
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
          direction={["row", "row", "row", "row"]}
        >
          <NextLink href="/">
            <Icon as={FaArrowLeft} />
          </NextLink>
          <Flex>
            <IconButton
              aria-label="delete"
              icon={<FaTrash />}
              colorScheme="red"
              mr={4}
              size="sm"
              // variant="ghost"
            />
            <NextLink
              href="/bookItem/edit/[id]"
              as={`/bookItem/edit/${data.bookItem.id}`}
            >
              <IconButton
                // variant="ghost"
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
      <Footer />
    </Container>
  );
};

export default BookItem;
