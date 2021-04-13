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
  Switch,
  Collapse,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useAtom } from "jotai";
import settingsAtom from "../state/state";

const Randomiser = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleRandomiserToggle = () => {
    setSettings({
      ...settings,
      randomiser: {
        ...settings.randomiser,
        isActive: !settings.randomiser.isActive,
      },
    });
  };

  const handleDuplicateToggle = () => {
    setSettings({
      ...settings,
      randomiser: {
        ...settings.randomiser,
        allowDuplicates: !settings.randomiser.allowDuplicates,
      },
    });
  };

  const handleNumberChange = (value) => {
    setSettings({
      ...settings,
      randomiser: {
        ...settings.randomiser,
        stickyNotes: value,
      },
    });
  };

  return (
    <VStack
      w="100%"
      alignItems="flex-start"
      borderWidth="1px"
      borderColor={settings.randomiser.isActive ? "gray.200" : "transparent"}
      background={settings.randomiser.isActive ? "white" : "transparent"}
      rounded="md"
      p={4}
    >
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Text
          color={settings.randomiser.isActive ? "neutral.900" : "gray.400"}
          fontWeight={settings.randomiser.isActive ? "700" : "500"}
        >
          Use Randomiser
        </Text>
        <Switch
          isChecked={settings.randomiser.isActive}
          onChange={handleRandomiserToggle}
        ></Switch>
      </HStack>
      <VStack
        as={Collapse}
        in={settings.randomiser.isActive}
        animateOpacity
        w="100%"
        alignItems="flex-start"
        overflow="visible"
      >
        <Divider></Divider>
        <HStack justifyContent="space-between" alignItems="center" w="100%">
          <HStack flexGrow={1} spacing={2}>
            <Text fontSize="14px">Random Sticky Notes</Text>
            <Tooltip
              label="The number of random sticky notes you want to generate on the canvas. Example: Pick two and you will get two sticky notes from the list"
              fontSize="sm"
            >
              <span>
                <Icon as={InformationCircleIcon} color="gray.400" />
              </span>
            </Tooltip>
          </HStack>
          <NumberInput
            size="sm"
            maxW={16}
            value={settings.randomiser.stickyNotes}
            isDisabled={settings.board.hasSelectedSticker}
            max={99}
            onChange={handleNumberChange}
            defaultValue={settings.editor.numberOfLines}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <HStack>
          <HStack flexGrow={1} spacing={2}>
            <Text fontSize="14px">Allow Duplicates</Text>
            <Tooltip
              label="The number of random sticky notes you want to generate on the canvas. Example: Pick two and you will get two sticky notes from the list"
              fontSize="sm"
            >
              <span>
                <Icon as={InformationCircleIcon} color="gray.400" />
              </span>
            </Tooltip>
          </HStack>
          <Switch
            size="sm"
            isChecked={settings.randomiser.allowDuplicates}
            onChange={handleDuplicateToggle}
          />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Randomiser;
