import { Box } from "@chakra-ui/core";
import React from "react";
import style from "../styles/table.scss";

const BooksTable = ({ data }) => {
  return (
    <Box className={style.table}>
      <table>
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
              <td data-label="ISBN">{b.isbnNumber}</td>
              <td data-label="Rack Number">{b.rackNumber}</td>
              <td data-label="Status">
                {b.status ? "Available" : "Not Available"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default BooksTable;
