import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('coinEffect', PiecSettings.assetsDir + 'coin_effect.png', 128, 128, 36);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [20, 50, 95, 15, 60, 97, 55]; //expressed as relative percentages to coin effect area
	var yPositions = [40, 25, 40, 85, 90, 86, 55]; //expressed as relative percentages to coin effect area
	var delays = [0, 100, 250, 300, 200, 50, 150];
	var loops = [1,1,1,1,1,1,1];
	var scales = [60,60,60,60,60,60,60];

	var animations = [];
	AnimationsUtil.playAnimations("coinEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, false, container, game, layer);

}