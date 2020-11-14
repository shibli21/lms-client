import { DateTime } from "luxon";
import NextLink from "next/link";
import React from "react";
import { BookItemsQuery, BookItemsQueryResult } from "../generated/graphql";
import styles from "../styles/table.module.css";

interface Props {
  data: BookItemsQuery;
}

const BookItemsTable = ({ data }: BookItemsQueryResult) => {
  return (
    <table className={styles.table2}>
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
        {data.bookItems.map((b) => (
          <tr>
            <td>
              <NextLink
                href="/bookItem/[id]"
                as={`/bookItem/${b.id}&${b.title}`}
              >
                {b.title}
              </NextLink>
            </td>
            <td>{b.author.authorName}</td>
            <td>{b.edition}</td>
            <td>{b.category}</td>
            <td>{b.numberOfCopies}</td>
            <td>
              {DateTime.fromMillis(parseInt(b.publicationDate)).toLocaleString(
                DateTime.DATE_MED
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookItemsTable;
