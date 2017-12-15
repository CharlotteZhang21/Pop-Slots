import * as AnimationsUtil from '../utils/slot-animations-util.js';

export function preload(game) {
	game.load.spritesheet('coinCascade', PiecSettings.assetsDir + 'coin-cascade-01.png', 128, 256, 32);
}

export function play(game, layer) {

	var container = document.getElementById("coin-cascade-area");
	var xPositions = [-5, 30, 62]; //expressed as relative percentages to coin effect area
	var yPositions = [0, 0, 0]; //expressed as relative percentages to coin effect area
	var delays = [1000, 1100, 1200];
	var loops = [0,0,0];
	var scales = [45,45,45];

	var animations = AnimationsUtil.playAnimations("coinCascade", xPositions, yPositions, delays, loops, 0, 40, scales, false, container, game, layer);

	for (var i = 0; i < animations.length; i++) {
		animations[i].alpha = 0;
		var tween = game.add.tween(animations[i]).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 1000);
	}
}