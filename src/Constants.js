// This file should be the single source of truth
// for common configurations such as dimensions,
// sprite animation frames, animation speeds, etc.

// General
export const WIDTH = 667;
export const HEIGHT = 375;
export const ENV = process.env.NODE_ENV;

// Character cards
export const CHARACTERS = [
  {
    name: 'Linus',
    key: 'character-card-linus',
    x: 76,
    y: 52,
    anchor: [0, 0],
    /* eslint-disable max-len */
    tutorialLines: [
      'Linus is frantically trying to catch all the computer parts Luke is throwing at him.',
      'Help him by tapping on where he should run to.',
      'Be quick and communicate, if you fail to catch a part, YOU STILL HAVE TO PAY FOR IT!',
    ],
    /* eslint-enable max-len */
  },
  {
    name: 'Luke',
    key: 'character-card-luke',
    x: 615,
    y: 52,
    anchor: [1, 0],
    /* eslint-disable max-len */
    tutorialLines: [],
    /* eslint-enable max-len */
  },
];

// Animations
export const INTRO_BG_ANIMATIONS = [
  {
    name: 'fire',
    frames: Array.from(Array(15).keys()), // Array: [ 0 ... 63 ]
    speed: 10,
  },
];
export const INTRO_TITLE_ANIMATIONS = [
  {
    name: 'blink',
    frames: [0, 1],
    speed: 1,
  },
];
export const LINUS_ANIMATIONS = [
  {
    name: 'wait',
    frames: [0, 1],
    speed: 5,
  },
  {
    name: 'walk',
    frames: [2, 3],
    speed: 4,
  },
];
export const CONVEYOR_ANIMATIONS = [
  {
    name: 'move',
    frames: Array.from(Array(64).keys()), // Array: [ 0 ... 63 ]
    speed: 30,
  },
];

// Part types
export const PART_TYPES = [
  {
    type: 'case',
    frame: 4,
    hasSpec: false,
    specPrefix: '',
    specSuffix: '',
    specOptions: [],
    minPriceMultiplier: 10,
    maxPriceMultiplier: 1000,
  },
  {
    type: 'cpu',
    frame: 5,
    hasSpec: true,
    specPrefix: '',
    specSuffix: 'Ghz',
    specOptions: [
      2.0,
      2.4,
      3.5,
      3.8,
      4.0,
      4.2,
      4.8,
    ],
    minPriceMultiplier: 50,
    maxPriceMultiplier: 210,
  },
  {
    type: 'graphics_card',
    frame: 6,
    hasSpec: true,
    specPrefix: 'GTX',
    specSuffix: '',
    specOptions: [
      1080,
      1070,
      1060,
      1050,
      980,
      970,
      960,
      950,
    ],
    minPriceMultiplier: 0.105,
    maxPriceMultiplier: 0.65,
  },
  {
    type: 'cooler',
    frame: 7,
    hasSpec: false,
    specPrefix: '',
    specSuffix: '',
    specOptions: [],
    minPriceMultiplier: 5,
    maxPriceMultiplier: 250,
  },
  {
    type: 'motherboard',
    frame: 8,
    hasSpec: false,
    specPrefix: '',
    specSuffix: '',
    specOptions: [],
    minPriceMultiplier: 50,
    maxPriceMultiplier: 800,
  },
  {
    type: 'powerSupply',
    frame: 9,
    hasSpec: true,
    specPrefix: '',
    specSuffix: 'W',
    specOptions: [
      100,
      200,
      400,
      600,
    ],
    minPriceMultiplier: 0.25,
    maxPriceMultiplier: 1.25,
  },
  {
    type: 'ram',
    frame: 10,
    hasSpec: true,
    specPrefix: '',
    specSuffix: 'GB',
    specOptions: [
      2,
      4,
      6,
      8,
      16,
      32,
      64,
    ],
    minPriceMultiplier: 12.5,
    maxPriceMultiplier: 12.5,
  },
  {
    type: 'ssd',
    frame: 11,
    hasSpec: true,
    specPrefix: '',
    specSuffix: 'GB',
    specOptions: [
      120,
      160,
      250,
      500,
      750,
      1000,
    ],
    minPriceMultiplier: 0.4,
    maxPriceMultiplier: 0.8,
  },
];

export const DIALOG_DEFAULT_OPTIONS = {
  mainTextString: 'Default Main Text',
  secondaryTextString: 'Default Secondary Text',
  hasInput: false,
  buttonStates: [
    {
      textString: 'OK',
      inputDownCallback: function inputDownCallback() {
        // ...
      },
      inputUpCallback: function inputDownCallback() {
        // ...
      },
    },
  ],
};
