import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Layout from "../components/layout";
import Header from "../components/header";

export const Page2 = () => {
  return (
    <Layout>
      <Link to="/">
        <Header title="Page 2" showArrow />
        <Box>This is Page 2</Box>
      </Link>
    </Layout>
  );
};
