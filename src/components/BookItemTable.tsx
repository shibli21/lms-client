import React from "react";
import styles from "../styles/table.module.css";
import { DateTime } from "luxon";

const BookItemTable = ({ data }) => {
  return (
    <table className={styles.table}>
      <tr>
        <th>Title</th>
        <td>{data.title}</td>
      </tr>
      <tr>
        <th>Author</th>
        <td>{data.author.authorName}</td>
      </tr>
      <tr>
        <th>Category </th>
        <td>{data.category}</td>
      </tr>
      <tr>
        <th>edition</th>
        <td>{data.edition}</td>
      </tr>
      <tr>
        <th>Number Of Copies</th>
        <td>{data.numberOfCopies}</td>
      </tr>
      <tr>
        <th>Publication Date</th>
        <td>
          {DateTime.fromMillis(parseInt(data.publicationDate)).toLocaleString(
            DateTime.DATE_MED
          )}
        </td>
      </tr>
    </table>
  );
};

export default BookItemTable;
