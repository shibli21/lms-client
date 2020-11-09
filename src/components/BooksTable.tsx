import React from "react";
import styles from "../styles/table.module.css";

const BooksTable = ({ data }) => {
  return (
    <table className={styles.table2}>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Rack Number</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((b) => (
          <tr>
            <td>{b.isbnNumber}</td>
            <td>{b.rackNumber}</td>
            <td>{b.status ? "Available" : "Not Available"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BooksTable;
