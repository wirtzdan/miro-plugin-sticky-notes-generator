import { atom } from "jotai";
import Randomiser from "../components/randomiser";

const settings = atom({
  editor: {
    list: `Item 1
Item 2
Item 3
Item 4`,
    numberOfLines: 4,
  },
  templates: {
    Dice: {
      editor: {
        list: `1
2
3
4
5
6`,
        numberOfLines: 6,
      },
      randomiser: {
        isActive: true,
        stickyNotes: 1,
      },
    },
    "2 Dice": {
      editor: {
        list: `1
2
3
4
5
6`,
        numberOfLines: 6,
      },
      randomiser: {
        isActive: true,
        stickyNotes: 2,
      },
    },
  },
  randomiser: {
    isActive: false,
    stickyNotes: 1,
  },
  board: {
    hasSelectedSticker: false,
    numberOfSelectedSticker: 0,
    selectedSticker: [],
  },
  generator: {
    status: "ready",
  },
});

export default settings;
