import * as React from "react";
import {
  Box,
  Button,
  chakra,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import SimpleEditor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { useAtom } from "jotai";
import settingsAtom from "../state/state";

const Editor = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  console.log("🚀 ~ file: editor.tsx ~ line 31 ~ Editor ~ settings", settings);

  const handleChange = (value) => {
    setSettings({
      ...settings,
      editor: {
        ...settings.editor,
        list: value,
        numberOfLines: value.replace(/\r\n/g, "\n").split("\n").length,
      },
    });
  };

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  const handleTemplateClick = (key) => {
    console.log(
      "🚀 ~ file: editor.tsx ~ line 48 ~ handleTemplateClick ~ key",
      key
    );
    console.log(
      "🚀 ~ file: editor.tsx ~ line 57 ~ handleTemplateClick ~ settings[key]",
      settings.templates[key]
    );

    setSettings({
      ...settings,
      ...settings.templates[key],
    });
  };

  return (
    <Box
      w="100%"
      position="relative"
      rounded="md"
      borderColor="#0F1899"
      borderWidth="2px"
      pt={10}
      background="white"
    >
      <HStack
        position="absolute"
        background="#0F1899"
        top="0"
        left="0"
        right="0"
        justifyContent="space-between"
        p={2}
        roundedTop="sm"
      >
        <Text color="white" fontSize="16px">
          My List
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            size="xs"
            backgroundColor="neutral.100"
            color="neutral.900"
          >
            Templates
          </MenuButton>
          <MenuList>
            <MenuGroup title="Dices">
              {Object.keys(settings.templates).map((key) => (
                <MenuItem key={key} onClick={() => handleTemplateClick(key)}>
                  {key}
                </MenuItem>
              ))}
            </MenuGroup>
          </MenuList>
        </Menu>
      </HStack>
      <Box maxH={80} overflowY="scroll">
        <SimpleEditor
          value={settings.editor.list}
          onValueChange={(value) => handleChange(value)}
          highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
          textareaId="codeArea"
          className="editor"
        />
      </Box>
    </Box>
  );
};

export default Editor;
