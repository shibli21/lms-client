import { Box } from "@chakra-ui/core";
import { DateTime } from "luxon";
import NextLink from "next/link";
import React from "react";
import { BookItemsQuery, BookItemsQueryResult } from "../generated/graphql";
import style from "../styles/table.scss";
interface Props {
  data: BookItemsQuery;
}

const BookItemsTable = ({ data }) => {
  if (!data) {
    return <Box>No data</Box>;
  }

  return (
    <Box className={style.table}>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Edition</th>
            <th>Category</th>
            <th>Number</th>
            <th>Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.id}>
              <td data-label="Title">
                <NextLink
                  href="/bookItem/[id]"
                  as={`/bookItem/${b.id}&${b.title}`}
                >
                  {b.title}
                </NextLink>
              </td>
              <td data-label="Author">{b.author.authorName}</td>
              <td data-label="Edition">{b.edition}</td>
              <td data-label="Category"> {b.category}</td>
              <td data-label="Number"> {b.numberOfCopies}</td>
              <td data-label="Publication Date">
                {DateTime.fromMillis(
                  parseInt(b.publicationDate)
                ).toLocaleString(DateTime.DATE_MED)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default BookItemsTable;
