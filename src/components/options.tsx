import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  VStack,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/solid";

const Options = () => {
  return (
    <Accordion allowToggle w="100%">
      <AccordionItem border="none">
        <h2>
          <AccordionButton
            _expanded={{ bg: "blue.500", color: "white" }}
            // _expanded={{ fontWeight: "bold" }}
            rounded="md"
          >
            <Box flex="1" textAlign="left">
              Show Options
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <HStack>
            <HStack>
              <Text>Sticky Notes to create</Text>
              <Tooltip label="Search places">
                <InformationCircleIcon />
              </Tooltip>
            </HStack>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Options;
