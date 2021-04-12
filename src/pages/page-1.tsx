import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";

import Layout from "../components/layout";
import Header from "../components/header";

import Editor from "../components/editor";
import Randomiser from "../components/randomiser";
import Footer from "../components/footer";
import Generator from "../components/generator";

export const Page1 = () => {
  return (
    <Layout>
      <Header title="Sticky Generator" />
      <VStack alignItems="flex-start" height="100%">
        <VStack alignItems="flex-start" flexGrow={1}>
          <Text>
            Enter your items in the field below, each on a separate line.
          </Text>
          <Editor />
        </VStack>
        <VStack w="100%" alignItems="flex-start">
          <Randomiser />
          <Generator />
          <Footer />
        </VStack>
      </VStack>
    </Layout>
  );
};
