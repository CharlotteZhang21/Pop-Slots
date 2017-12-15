import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('stackEffect', PiecSettings.assetsDir + 'coin_stack_effect.png', 256, 256, 32);
}

export function play(game, layer) {

	var container = document.getElementById("coin-stack-area");
	var xPositions = [20, 60, 95]; //expressed as relative percentages to coin effect area
	var yPositions = [20, 25, 20]; //expressed as relative percentages to coin effect area
	var delays = [0, 200, 350];
	var loops = [1,1,1];
	var scales = [60,60,60];

	var animations = AnimationsUtil.playAnimations("stackEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, true, container, game, layer);
}