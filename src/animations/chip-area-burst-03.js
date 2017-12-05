import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('chipBurst', PiecSettings.assetsDir + 'chips_burst.png', 300, 300, 24);
}

export function play(game, layer) {

	var container = document.getElementById("coin-effect-area");
	var xPositions = [35, 10, 55,  30, 87, 50, 55, 10, 90, 90, 100, 35, 10,  55,  30, 87,50,55,35,90,90,100]; //expressed as relative percentages to coin effect area
	var yPositions = [50, 10, 100, 45, 45, 20, 95, 10, 55, 90, 10,  50, 100, 100, 45, 45,20,95,50,55,90,10]; //expressed as relative percentages to coin effect area
	var delays = [0, 400, 650, 800, 900, 1200,1250,1300,1400,1600,1700,2000,2300,2500,2700,3000,3100,3200,3400,3600,3800,4000];
	var loops = [1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1];
	var scales = [50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50];

	var animations = AnimationsUtil.playAnimations("chipBurst", xPositions, yPositions, delays, loops, 0.5, 30, scales, false, container, game, layer);
}