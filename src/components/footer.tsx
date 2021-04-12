import * as React from "react";
import { HStack, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack fontSize="12px" justifyContent="space-between" w="100%">
      <Text>
        Made by <Link></Link>{" "}
        <Link href="https://facilitator.school" isExternal>
          Facilitator School
        </Link>
      </Text>
      <Link href="https://airtable.com/shrLIr5w0fuW7aqls" isExternal>
        Feedback
      </Link>
    </HStack>
  );
};

export default Footer;
