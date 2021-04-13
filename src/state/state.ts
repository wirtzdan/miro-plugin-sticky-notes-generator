import { atom } from "jotai";
import Randomiser from "../components/randomiser";

const settings = atom({
  editor: {
    list: `Giraffe
Tiger
Elephant`,
    numberOfLines: 3,
  },
  templates: {
    Chance: {
      "Heads or Tail": {
        editor: {
          list: `Heads
Tail`,
          numberOfLines: 2,
        },
        randomiser: {
          isActive: true,
          stickyNotes: 1,
          allowDuplicates: false,
        },
      },
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
          allowDuplicates: false,
        },
      },
      "2 Dices": {
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
          allowDuplicates: true,
        },
      },
    },
    Icebreaker: {
      "Would you rather?": {
        editor: {
          list: `Would you rather live in the ocean or on the moon?
Would you rather meet your travel back in time to meet your ancestors or to the future to meet your descendants?
Would you rather lose all of your money or all of your pictures?
Would you rather have invisibility or flight?
Would you rather live where it only snows or the temperature never falls below 100 degrees?
Would you rather always be slightly late or super early?
Would you rather give up your smartphone or your computer?
Would you rather live without heat and AC or live without social media?
Would you rather be the funniest or smartest person in the room?
Would you rather be able to run at 100 miles per hour or fly at 10 miles per hour?
Would you rather be a superhero or the world’s best chef?
Would you rather be an Olympic gold medallist or an astronaut?`,
          numberOfLines: 12,
        },
        randomiser: {
          isActive: false,
          stickyNotes: 1,
          allowDuplicates: false,
        },
      },
      "Work from Home": {
        editor: {
          list: `Do you love working from home or would you rather be in the office? Is there a balance of both that you like best?
What’s the hardest part about working virtually for you? The easiest?
Do you have a dedicated office space at home?
Show us your office space!
Where do you work most frequently from at home? Your office? Your kitchen table? The backyard? Your bed?
Be honest, how often do you work from bed?
What did you eat for breakfast?
What does your morning routine look like when working from home?
What’s your number one tip for combating distractions when working from home?
How do you stay productive and motivated working virtually?
What does your typical work from home uniform look like?
How many cups of coffee, tea, or beverage-of-choice do you have each morning?
Are you an early bird or night owl?
What about showers? Do you prefer morning or night?
What’s one thing we could do to improve our virtual meetings?
What’s your favorite flower or plant?
What’s your caffeinated beverage of choice? Coffee? Cola? Tea?
What’s your favorite scent?
What’s the last great TV show or movie you wanted?
Best book you’ve ever read?
Best professional development book you’ve ever read?
If you could learn one new professional skill, what would it be?
If you could learn one new personal skill, what would it be?
What’s your favorite way to get in some exercise?
If you could write a book, what genre would you write it in? Mystery? Thriller? Romance? Historical fiction? Non-fiction?`,
          numberOfLines: 25,
        },
        randomiser: {
          isActive: false,
          stickyNotes: 1,
          allowDuplicates: false,
        },
      },
    },
  },
  randomiser: {
    isActive: false,
    stickyNotes: 1,
    allowDuplicates: false,
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
