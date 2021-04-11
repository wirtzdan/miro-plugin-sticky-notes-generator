import * as React from "react";
import { VStack, HStack, Divider, Heading, Icon } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Header = ({ title, showArrow = false, showDivider = true }) => {
  return (
    <VStack spacing={4} alignItems="flex-start" width="100%">
      <HStack spacing={6}>
        {showArrow ? (
          <Link to="/">
            <Icon w={6} h={6} as={ArrowLeftIcon} />
          </Link>
        ) : undefined}
        <Heading size="md">{title}</Heading>
      </HStack>
      {showDivider ? <Divider /> : undefined}
    </VStack>
  );
};

export default Header;
