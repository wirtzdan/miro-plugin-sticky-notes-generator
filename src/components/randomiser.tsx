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

  const handleSwitch = () => {
    setSettings({
      ...settings,
      randomiser: {
        ...settings.randomiser,
        isActive: !settings.randomiser.isActive,
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
          onChange={handleSwitch}
        ></Switch>
      </HStack>
      <VStack
        as={Collapse}
        in={settings.randomiser.isActive}
        animateOpacity
        w="100%"
        alignItems="flex-start"
      >
        <Divider></Divider>
        <HStack justifyContent="space-between" alignItems="center" w="100%">
          <HStack flexGrow={1}>
            <Text fontSize="14px">Sticky Notes</Text>
            <Tooltip
              label="The number of sticky notes you want to generate and randomise"
              fontSize="md"
            >
              <Icon as={InformationCircleIcon} color="gray.300" />
            </Tooltip>
          </HStack>
          <NumberInput
            size="sm"
            maxW={16}
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
      </VStack>
    </VStack>
  );
};

export default Randomiser;
