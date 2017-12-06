var PiecSettings = PiecSettings || {};

PiecSettings.version = "-";

PiecSettings.autospin = {
    activateAfter: 10000,
}

//////// DEFAULT SETTINGS FOR SLOT GAMES ////////

PiecSettings.winlinePalette = [0xfdf9c6, 0xf3d868, 0xc98e43, 0xff8247, 0xfaed60, 0xeba22c]; //Colours used by the winlines
PiecSettings.fontColor = "#ffffff"; //Remove empty if you want to use the default golden gradient
PiecSettings.fontFamily = "Baskerville"; //Make sure that this font is on the css and that there is a div that uses it. (preload-font div)

//////// SLOTS GAME SETTINGS ///////////////

PiecSettings.tooltip = { // If there is a "src" value, it will always pic the image.
    text: "SPIN TO\nWIN!",
    fontColor: "#ffffff", //Remove if you want to use the default golden gradient
    src: 'tooltip.png',
};

PiecSettings.reelLayout = [3,3,3]; // Heights of each of the reels in array form, where the first item is the height of the first reel, and so on.
PiecSettings.reels = [ // Tease on first spin, win on second, big win on third
    ["wild","wild","wild","wild","oneb","oneb","trib","gold","gold","doubleb","oneb","brown","brown","gold","gold","gold","brick","brick","brick","brick","brick","brick","brick","gold","doubleb","doubleb","brown","brown","brown","brown","brown","brown","trib","oneb","brown","brown","brown"],
    ["brick","brick","brick","gold","oneb","bell","bell","bell","gold","brick","brick","brick","brick","oneb","gold","gold","trib","doubleb","doubleb","bell","bell","bell","bell","bell","bell","doubleb","doubleb","doubleb","trib","doubleb","doubleb","gold","bell","bell","bell","doubleb","oneb","trib"],
    ["bell","bell","bell","brown","brown","doubleb","trib","oneb","doubleb","brown","brown","brown","brown","gold","gold","gold","trib","brick","brick","brick","brick","brick","doubleb","doubleb","bell","bell","bell","gold","brown","brown","brown","trib","bell","bell","bell","bell","bell","bell","gold","doubleb","bell"],
];
PiecSettings.reelsAnimation = {
    delayPerReel: [0,300,600],
};

/////// Win Counter settings
PiecSettings.winCounterInitialValue = 0;
PiecSettings.winCounterCommaSeparation = true; //One thousand will appear as 1,000 if this is true; 1000 if this is false

/////// Control symbol vertical spacing here
PiecSettings.symbolHeight = 130;

/////// FINAL OVERLAY SCREEN SETTINGS ///////

PiecSettings.finalOverlay = {
    color: 0x000000,
    alpha: 0.5,
    delay: 3000,
};

/////// SLOTS SPINS SETTINGS ////////

PiecSettings.spins = [
    { // Spin 1
        stopPositions: [23,24,22], //Stop positions for Spin 1, for each of reels 1, 2 and so on
        winlines: [ // Highlighted winlines
            [2,1,0], // Specifies the symbol index that needs to be highlighted per reel. 0,0,0 is the first row
            [1,1,1], // 1,1,1 is the second row
        ],
        // respinFeature: {
        //     newStopPositions: [12,11,12],
        // },
        winCounter: 250000,
        winAnimations: [
            'coin-line-burst-01',
        ],
    },
    { // Spin 2
        stopPositions: [13,13,13], //Stop positions for Spin 1, for each of reels 1, 2 and so on
        winlines: [
            [0,1,2],
            [1,1,1],
            [2,2,2],
            [2,1,0]
        ],
        // respinFeature: {
        //     newStopPositions: [13,13,12],
        // },
        // symbolPatternFeature: {
        //     symbol: 'W',
        //     pattern:  [
        //         [1],
        //         [],
        //         [1]
        //     ],
        // },
        winCounter: 1200000,
        winAnimations: [
            "coin-line-burst-02",
        ],
    },
    { // Spin 3
        stopPositions: [0,1,0], //Stop positions for Spin 1, for each of reels 1, 2 and so on
        winlines: [
            [0,0,0],
            [1,1,1],
            [2,2,2],
            [0,1,2],
            [2,1,0],
        ],
        respinFeature: {
            newStopPositions: [0,0,0],
        },
        winCounter: 5000000,
        winAnimations: [
            'coin-area-burst-03',
            'coin-cascade-02',
            'coin-line-stack-01',
        ],
        pngSequence: {
            src: 'cleopatra_anim.jpg',
            htmlContainer:'cleopatra-container',
            spriteWidth: 339.6,
            spriteHeight: 248,
            spriteNumber: 16,
            loops: 0, //write 0 if infinite loop
            delay: 3000,
            fps: 10,
            effect: 'fade-in',
        },
        // winMessage: {
        //     src: "hugewin---.png",
        //     animation: 'zoom-and-bounce-in',
        //     duration: 1000,
        //     delay: 4700,
        // }
    }
];