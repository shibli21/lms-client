import React from "react";
import styles from "../styles/table.module.css";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const BookItemTable = ({ data }) => {
  dayjs.extend(customParseFormat);
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
        <td>{dayjs(data.publicationDate, "MM-DD-YYYY").toString()}</td>
      </tr>
    </table>
  );
};

export default BookItemTable;
