import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "../components/layout";
import Header from "../components/header";

export const Page1 = () => {
  return (
    <Layout>
      <Header title="Page 1" />
      <Link to="/page-2">
        <Box>Go to Page 2</Box>
      </Link>
    </Layout>
  );
};
