import * as React from "react";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import settingsAtom from "../state/state";
import sample from "lodash/sample";

const Generator = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleSelect = (selection) => {
    console.log(
      "🚀 ~ file: generator.tsx ~ line 10 ~ handleSelect ~ selection",
      selection
    );
    const sticker = selection.data.filter(
      (widget) => widget.type === "STICKER"
    );

    sticker.length > 0
      ? setSettings({
          ...settings,
          board: {
            ...settings.board,
            hasSelectedSticker: true,
            numberOfSelectedSticker: sticker.length,
            selectedSticker: sticker,
          },
        })
      : setSettings({
          ...settings,
          board: {
            ...settings.board,
            hasSelectedSticker: false,
            numberOfSelectedSticker: 0,
            selectedSticker: [],
          },
        });
  };

  React.useEffect(() => {
    miro.addListener("SELECTION_UPDATED", handleSelect);

    return function cleanUp() {
      miro.removeListener("SELECTION_UPDATED", handleSelect);
    };
  }, [
    settings.randomiser,
    settings.editor,
    settings.generator,
    settings.templates,
  ]);

  const randomSelectionFromArray = (array, number) => {
    let newArr = [];
    if (number >= array.length) {
      return array;
    }
    for (let i = 0; i < number; i++) {
      let newElem = array[Math.floor(Math.random() * array.length)];
      newArr.push(newElem);
    }
    return newArr;
  };

  const getList = (number) => {
    const list = settings.editor.list.replace(/\r\n/g, "\n").split("\n");

    // ! The first shuffle needs to fixed so it works with duplicates
    // ! Also it's good to change this to lodash here and use sample
    return settings.randomiser.isActive
      ? settings.randomiser.allowDuplicates
        ? randomSelectionFromArray(list, number)
        : sample(list, number)
      : list.slice(0, number);
  };

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const updateStickyNotes = async () => {
    setSettings({
      ...settings,
      generator: {
        ...settings.generator,
        status: "loading",
      },
    });

    let widgets = [];

    let selectedWidgets = await miro.board.selection.get();
    console.log("selected widgets", selectedWidgets);

    let stickers = selectedWidgets.filter(
      (widget) => widget.type === "STICKER"
    );

    const list = getList(stickers.length);

    stickers.map((sticker, index) => {
      widgets.push({
        ...sticker,
        id: sticker.id,
        text: list[index],
      });
    });

    await miro.board.widgets.update(widgets);

    setTimeout(function () {
      setSettings({
        ...settings,
        generator: {
          ...settings.generator,
          status: "success",
        },
      });
    }, 250);

    setSettings({
      ...settings,
      generator: {
        ...settings.generator,
        status: "active",
      },
    });

    miro.showNotification("Stickers have been updated");
  };

  const createStickyNotes = async () => {
    setSettings({
      ...settings,
      generator: {
        ...settings.generator,
        status: "loading",
      },
    });

    let widgets = [];

    const viewport = await miro.board.viewport.getViewport();

    console.log(
      "🚀 ~ file: generator.tsx ~ line 148 ~ createStickyNotes ~ viewport",
      viewport
    );

    const list = getList(
      settings.randomiser.isActive
        ? settings.randomiser.stickyNotes
        : settings.editor.numberOfLines
    );

    list.map((sticker, index) => {
      widgets.push({
        type: "sticker",
        text: list[index],
        x: viewport.x + viewport.width / 2 + index * 220,
        y: viewport.y + viewport.height / 2,
      });
    });

    await miro.board.widgets.create(widgets);

    setTimeout(function () {
      setSettings({
        ...settings,
        generator: {
          ...settings.generator,
          status: "success",
        },
      });
    }, 250);

    setSettings({
      ...settings,
      generator: {
        ...settings.generator,
        status: "active",
      },
    });

    miro.showNotification("Stickers have been created");
  };

  const handleClick = () => {
    settings.board.hasSelectedSticker
      ? updateStickyNotes()
      : createStickyNotes();
  };

  const getText = () =>
    settings.randomiser.isActive
      ? settings.board.hasSelectedSticker
        ? settings.board.numberOfSelectedSticker > 1
          ? `Update ${settings.board.numberOfSelectedSticker} Sticky Notes`
          : `Update ${settings.board.numberOfSelectedSticker} Sticky`
        : settings.randomiser.stickyNotes > 1
        ? `Create ${settings.randomiser.stickyNotes} Sticky Notes`
        : `Create ${settings.randomiser.stickyNotes} Sticky`
      : settings.board.hasSelectedSticker
      ? settings.board.numberOfSelectedSticker > 1
        ? `Update ${settings.board.numberOfSelectedSticker} Sticky Notes`
        : `Update ${settings.board.numberOfSelectedSticker} Sticky`
      : settings.editor.numberOfLines > 1
      ? `Create ${settings.editor.numberOfLines} Sticky Notes`
      : `Create ${settings.editor.numberOfLines} Sticky`;

  return (
    <Button
      isFullWidth
      size="lg"
      color="white"
      background="primary.500"
      isLoading={settings.generator.status === "loading"}
      loadingText={
        settings.board.hasSelectedSticker
          ? "Updating Stickies"
          : "Creating Stickies"
      }
      isDisabled={settings.editor.numberOfLines === 0}
      onClick={handleClick}
      _hover={{ background: "primary.700" }}
    >
      {getText()}
    </Button>
  );
};

export default Generator;
