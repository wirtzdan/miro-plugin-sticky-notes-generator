import * as React from "react";
import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import settingsAtom from "../state/state";

const useGenerator = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleSelect = (selection) => {
    const sticker = selection.data.filter(
      (widget) => widget.type === "STICKER"
    );

    console.log(
      "🚀 ~ file: use-generator.ts ~ line 40 ~ miro.addListener ~ settings",
      settings
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
    miro.addListener("SELECTION_UPDATED", (selection) => {
      handleSelect(selection);
    });
  }, []);

  const getList = () => settings.editor.list.replace(/\r\n/g, "\n").split("\n");

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

    const randomList = shuffle(getList()).slice(0, stickers.length);

    stickers.map((sticker, index) => {
      widgets.push({
        ...sticker,
        id: sticker.id,
        text: randomList[index],
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

  return { updateStickyNotes };
};

export default useGenerator;
