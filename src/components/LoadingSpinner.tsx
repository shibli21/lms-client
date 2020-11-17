import { Spinner } from "@chakra-ui/core";
import React, { ReactElement } from "react";

interface Props {}

function LoadingSpinner({}: Props): ReactElement {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  );
}

export default LoadingSpinner;
