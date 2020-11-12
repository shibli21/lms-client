import React from "react";
import styles from "../styles/table.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useIssuedBookForCurrentUserQuery } from "../generated/graphql";
import { Box } from "@chakra-ui/core";
dayjs.extend(customParseFormat);

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
          <tr>
            <td>{b.isbnNumber}</td>
            <td>{b.title}</td>
            <td>{dayjs(b.createdAt).toString()}</td>
            <td>{dayjs(`${new Date(b.returnDate)}`, "MM-YY-DD").toString()}</td>
            <td>{b.returnedDate}</td>
            <td>{b.fine}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IssuedBookTable;
