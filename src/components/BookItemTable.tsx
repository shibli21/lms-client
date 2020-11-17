import { Box, useMediaQuery } from "@chakra-ui/core";
import { DateTime } from "luxon";
import React from "react";
import styles from "../styles/table.scss";

const BookItemTable = ({ data }) => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Box className={styles.table}>
      <table className={styles.table}>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Title
          </th>
          <td data-label="Title">{data.title}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Author
          </th>
          <td data-label="Author">{data.author.authorName}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Category{" "}
          </th>
          <td data-label="Category">{data.category}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            edition
          </th>
          <td data-label="Edition">{data.edition}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Number Of Copies
          </th>
          <td data-label="Number Of Copies">{data.numberOfCopies}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Publication Date
          </th>
          <td data-label="Publication Date">
            {DateTime.fromMillis(parseInt(data.publicationDate)).toLocaleString(
              DateTime.DATE_MED
            )}
          </td>
        </tr>
      </table>
    </Box>
  );
};

export default BookItemTable;
