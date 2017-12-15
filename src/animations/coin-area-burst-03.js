import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('coinEffect', PiecSettings.assetsDir + 'coin_effect.png', 128, 128, 36);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [35, 10, 55,  95, 90, 70, 100, 10]; //expressed as relative percentages to coin effect area
	var yPositions = [50, 10, 100, 45, 99, 30, 10, 95]; //expressed as relative percentages to coin effect area
	var delays = [0, 400, 650, 800, 900, 1200,1250,1300];
	var loops = [2,2,3,2,2,2,2,2];
	var scales = [60,60,60,60,60,60,60,60];

	var animations = [];
	AnimationsUtil.playAnimations("coinEffect", xPositions, yPositions, delays, loops, 0.5, 40, scales, false, container, game, layer);

}