import React from "react";
import styles from "../styles/table.module.css";
import { DateTime } from "luxon";
import { useIssuedBookForCurrentUserQuery } from "../generated/graphql";
import { Box, Button, HStack } from "@chakra-ui/core";
import Link from "next/link";

const IssuedBookTable = () => {
  const { data } = useIssuedBookForCurrentUserQuery();

  if (!data) {
    return <Box>No data</Box>;
  }

  return (
    <table className={styles.table}>
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
            <td>{b.isbnNumber}</td>
            <td>{b.title}</td>
            <td>
              {DateTime.fromMillis(parseInt(b.createdAt)).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
            <td>
              {DateTime.fromISO(b.returnDate).toLocaleString(DateTime.DATE_MED)}
            </td>
            <td>
              {b.returnedDate ? (
                DateTime.fromISO(b.returnedDate).toLocaleString(
                  DateTime.DATE_MED
                )
              ) : (
                <HStack>
                  <Link href={`/renew-book?isbn=${b.isbnNumber}`}>
                    <Button size="sm" colorScheme="teal">
                      Renew
                    </Button>
                  </Link>
                  <Link href={`/return-book?isbn=${b.isbnNumber}`}>
                    <Button size="sm" colorScheme="blue">
                      Return
                    </Button>
                  </Link>
                </HStack>
              )}
            </td>
            <td>{b.fine}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssuedBookTable;
