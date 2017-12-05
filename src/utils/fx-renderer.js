import * as Util from '../utils/util';

import * as CoinLineBurst01 from '../animations/coin-line-burst-01.js';
import * as CoinLineBurst02 from '../animations/coin-line-burst-02.js';
import * as CoinAreaBurst01 from '../animations/coin-area-burst-01.js';
import * as CoinAreaBurst02 from '../animations/coin-area-burst-02.js';
import * as CoinAreaBurst03 from '../animations/coin-area-burst-03.js';
import * as CoinCascade01 from '../animations/coin-cascade-01.js';
import * as CoinCascade02 from '../animations/coin-cascade-02.js';
import * as CoinLineStack01 from '../animations/coin-line-stack-01.js';
import * as CoinLineStack02 from '../animations/coin-line-stack-02.js';
import * as ChipLineBurst01 from '../animations/chip-line-burst-01.js';
import * as ChipLineBurst02 from '../animations/chip-line-burst-02.js';
import * as ChipAreaBurst01 from '../animations/chip-area-burst-01.js';
import * as ChipAreaBurst02 from '../animations/chip-area-burst-02.js';
import * as ChipAreaBurst03 from '../animations/chip-area-burst-03.js';

export function preloadFx(game) {
    for (var j = 0; j < PiecSettings.spins.length; j++) {
        if (PiecSettings.spins[j].winAnimations != null) {
            for (var i = 0; i < PiecSettings.spins[j].winAnimations.length; i++) {
                switch (PiecSettings.spins[j].winAnimations[i]) {
                    case 'coin-line-burst-01':
                        CoinLineBurst01.preload(game);
                        break;
                    case 'coin-line-burst-02':
                        CoinLineBurst02.preload(game);
                        break;
                    case 'coin-area-burst-01':
                        CoinAreaBurst01.preload(game);
                        break;
                    case 'coin-area-burst-02':
                        CoinAreaBurst02.preload(game);
                        break;
                    case 'coin-area-burst-03':
                        CoinAreaBurst03.preload(game);
                        break;
                    case 'coin-cascade-01':
                        CoinCascade01.preload(game);
                        break;
                    case 'coin-cascade-02':
                        CoinCascade02.preload(game);
                        break;
                    case 'coin-line-stack-01':
                        CoinLineStack01.preload(game);
                        break;
                    case 'coin-line-stack-02':
                        CoinLineStack02.preload(game);
                        break;
                    case 'chip-line-burst-01':
                        ChipLineBurst01.preload(game);
                        break;
                    case 'chip-line-burst-02':
                        ChipLineBurst01.preload(game);
                        break;
                    case 'chip-area-burst-01':
                        ChipAreaBurst01.preload(game);
                        break;
                    case 'chip-area-burst-02':
                        ChipAreaBurst02.preload(game);
                        break;
                    case 'chip-area-burst-03':
                        ChipAreaBurst03.preload(game);
                        break;
                }
            }
        }
    }
}

export function playFx(game, layer) {
    if (PiecSettings.spins[game.global.spin - 1].winAnimations != null) {
        for (var i = 0; i < PiecSettings.spins[game.global.spin - 1].winAnimations.length; i++) {
            switch (PiecSettings.spins[game.global.spin - 1].winAnimations[i]) {
                case 'coin-line-burst-01':
                    CoinLineBurst01.play(game, layer);
                    break;
                case 'coin-line-burst-02':
                    CoinLineBurst02.play(game, layer);
                    break;
                case 'coin-area-burst-01':
                    CoinAreaBurst01.play(game, layer);
                    break;
                case 'coin-area-burst-02':
                    CoinAreaBurst02.play(game, layer);
                    break;
                case 'coin-area-burst-03':
                    CoinAreaBurst03.play(game, layer);
                    break;
                case 'coin-cascade-01':
                    CoinCascade01.play(game, layer);
                    break;
                case 'coin-cascade-02':
                    CoinCascade02.play(game, layer);
                    break;
                case 'coin-line-stack-01':
                    CoinLineStack01.play(game, layer);
                    break;
                case 'coin-line-stack-02':
                    CoinLineStack02.play(game, layer);
                    break;
                case 'chip-line-burst-01':
                    ChipLineBurst01.play(game, layer);
                    break;
                case 'chip-line-burst-02':
                    ChipLineBurst02.play(game, layer);
                    break;
                case 'chip-area-burst-01':
                    ChipAreaBurst01.play(game, layer);
                    break;
                case 'chip-area-burst-02':
                    ChipAreaBurst02.play(game, layer);
                    break;
                case 'chip-area-burst-03':
                    ChipAreaBurst03.play(game, layer);
                    break;
            }
        }
    }
}
