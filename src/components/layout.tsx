import * as React from "react";
import { ScaleFade, VStack, Box } from "@chakra-ui/react";

const Layout = ({ children, animate = false }) => {
  return (
    <Box
      position="absolute"
      top="0"
      right="0"
      bottom="0"
      left="0"
      p="20px 24px"
      background="white"
    >
      {animate ? (
        <ScaleFade in>
          <VStack spacing={4} alignItems="flex-start">
            {children}
          </VStack>
        </ScaleFade>
      ) : (
        <VStack spacing={4} alignItems="flex-start">
          {children}
        </VStack>
      )}
    </Box>
  );
};

export default Layout;
