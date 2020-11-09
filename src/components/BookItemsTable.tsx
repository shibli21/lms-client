import NextLink from "next/link";
import React from "react";
import { BookItemsQuery } from "../generated/graphql";
import styles from "../styles/table.module.css";

interface Props {
  data: BookItemsQuery;
}

const BookItemsTable = ({ data }: Props) => {
  return (
    <table className={styles.table2}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Name</th>
          <th>Edition</th>
          <th>Category</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {data.bookItems.map((b) => (
          <tr>
            <td>
              <NextLink href="/bookItem/[id]" as={`/bookItem/${b.id}`}>
                {b.title}
              </NextLink>
            </td>
            <td>{b.author.authorName}</td>
            <td>{b.edition}</td>
            <td>{b.category}</td>
            <td>{b.numberOfCopies}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookItemsTable;
