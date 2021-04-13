import * as React from "react";
import {
  VStack,
  HStack,
  Divider,
  Heading,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";

const Header = ({
  title,
  showArrow = false,
  showDivider = false,
  showHelp = false,
}) => {
  return (
    <VStack spacing={4} alignItems="flex-start" width="100%">
      <HStack w="100%" spacing={2} alignItems="center">
        <HStack spacing={4}>
          {showArrow ? (
            <Link to="/">
              <Icon w={6} h={6} as={ArrowLeftIcon} />
            </Link>
          ) : undefined}
          <Heading size="md">{title}</Heading>
        </HStack>
        {showHelp ? (
          <HStack spacing={2}>
            <Divider orientation="vertical" h={6} />
            <Link to="/help">
              <Icon w={5} h={5} as={QuestionMarkCircleIcon} />
            </Link>
          </HStack>
        ) : undefined}
      </HStack>
      {showDivider ? <Divider /> : undefined}
    </VStack>
  );
};

export default Header;
