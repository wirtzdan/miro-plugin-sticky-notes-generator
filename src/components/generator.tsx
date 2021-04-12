import * as React from "react";
import { Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import settingsAtom from "../state/state";

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

  const getList = (number) => {
    const list = settings.editor.list.replace(/\r\n/g, "\n").split("\n");

    return settings.randomiser.isActive
      ? shuffle(list).slice(0, number)
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

    const list = getList(
      settings.randomiser.isActive
        ? settings.randomiser.stickyNotes
        : settings.editor.numberOfLines
    );

    list.map((sticker, index) => {
      widgets.push({
        type: "sticker",
        text: list[index],
        x: index * 220,
        // y: Math.trunc((index + 1) / 4) * 220,
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
    settings.board.hasSelectedSticker
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
