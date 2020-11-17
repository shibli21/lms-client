import { Box, useMediaQuery } from "@chakra-ui/core";
import React from "react";
import styles from "../styles/table.scss";

const ProfileTable = ({ data }) => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Box className={styles.table}>
      <table>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Name
          </th>
          <td data-label="Name">{data?.username}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Email
          </th>
          <td data-label="Email">{data?.email}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Books CheckedOut
          </th>
          <td data-label="Books CheckedOut">{data?.numberOfBooksCheckedOut}</td>
        </tr>
        <tr>
          <th style={{ display: `${isSmallerThan600 ? "none" : "block"}` }}>
            Student Id
          </th>
          <td data-label="Student Id">{data?.studentId}</td>
        </tr>
      </table>
    </Box>
  );
};

export default ProfileTable;
