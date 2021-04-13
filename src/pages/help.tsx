import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "../components/layout";
import Header from "../components/header";

export const Help = () => {
  return (
    <Layout>
      <Link to="/">
        <Header title="Help" showArrow showDivider />
        <Box>This is the help page</Box>
      </Link>
    </Layout>
  );
};
