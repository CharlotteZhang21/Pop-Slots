import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('coinEffect', PiecSettings.assetsDir + 'coin_effect.png', 300, 300, 42);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [20, 55, 95]; //expressed as relative percentages to coin effect area
	var yPositions = [80, 70, 80]; //expressed as relative percentages to coin effect area
	var delays = [0, 100, 200];
	var loops = [1,1,1];
	var scales = [60,60,60];

	var animations = AnimationsUtil.playAnimations("coinEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, false, container, game, layer);
}