import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('chipBurst', PiecSettings.assetsDir + 'chips_burst.png', 300, 300, 24);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [20, 55, 95, 15, 50, 97]; //expressed as relative percentages to coin effect area
	var yPositions = [30, 20, 45, 95, 80, 95]; //expressed as relative percentages to coin effect area
	var delays = [0, 100, 250, 300, 200, 50];
	var loops = [2,2,2,2,2,2];
	var scales = [50,50,50,50,50,50];

	var animations = AnimationsUtil.playAnimations("chipBurst", xPositions, yPositions, delays, loops, 0.5, 30, scales, false, container, game, layer);
}