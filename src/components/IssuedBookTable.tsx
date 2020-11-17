import { Box, Button, Flex, HStack } from "@chakra-ui/core";
import { DateTime } from "luxon";
import Link from "next/link";
import React from "react";
import { useIssuedBookForCurrentUserQuery } from "../generated/graphql";
import styles from "../styles/table.scss";

const IssuedBookTable = () => {
  const { data } = useIssuedBookForCurrentUserQuery();

  if (!data) {
    return <Box>No data</Box>;
  }

  return (
    <Box className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Issued date</th>
            <th>Return Date</th>
            <th>Returned date</th>
            <th>Fine</th>
          </tr>
        </thead>
        <tbody>
          {data.issuedBookForCurrentUser.map((b) => (
            <tr key={b.id}>
              <td data-label="ISBN">{b.isbnNumber}</td>
              <td data-label="Title">{b.title}</td>
              <td data-label="Issued Date">
                {DateTime.fromMillis(parseInt(b.createdAt)).toLocaleString(
                  DateTime.DATE_MED
                )}
              </td>
              <td data-label="Return Date">
                {DateTime.fromISO(b.returnDate).toLocaleString(
                  DateTime.DATE_MED
                )}
              </td>
              <td data-label="Returned Date">
                {b.returnedDate ? (
                  DateTime.fromISO(b.returnedDate).toLocaleString(
                    DateTime.DATE_MED
                  )
                ) : (
                  <Flex justify="flex-end" align="center">
                    <Link href={`/renew-book?isbn=${b.isbnNumber}`}>
                      <Button size="sm" colorScheme="teal" mr={2}>
                        Renew
                      </Button>
                    </Link>
                    <Link href={`/return-book?isbn=${b.isbnNumber}`}>
                      <Button size="sm" colorScheme="blue">
                        Return
                      </Button>
                    </Link>
                  </Flex>
                )}
              </td>
              <td data-label="Fine">{b.fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default IssuedBookTable;
