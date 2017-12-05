import * as Util from '../utils/util';
import BezierEasing from '../utils/bezier-easing';
import Symbol from '../prefabs/symbol';

class Reel extends Phaser.Group {
	/*
	  Receives
	  * Game
	  * 
	*/
	constructor(game, x, y, reelSymbols, reelHeightValue, scale, parentX, parentY) {

		super(game);

		this.reelSymbolList = reelSymbols;

		this.reelHeight = reelHeightValue;
		this.reelWidth = PiecSettings.reelWidth;


		this.x = x;
		this.y = y;
		this.parentX = parentX;
		this.parentY = parentY;

		this.totalHeight = 0;
		this.currentStopPosition = 0;

		this.createReel();
		this.applyMask(scale);

	}

	createReel() {
		for (var i = 0; i < this.reelSymbolList.length; i++) {
			this.createSymbol(i, this.reelSymbolList[i]);
		}
	}

	applyMask(scale) {
		var mask = this.game.add.graphics(0,0);
		mask.beginFill(0xffffff);
		mask.drawRect(
			this.x * scale + this.parentX,
			this.y * scale + this.parentY,
			this.reelWidth * scale,
			this.totalHeight/this.reelSymbolList.length * this.reelHeight * scale);
		this.mask = mask;

		console.log(scale);

		// this.myRectangle = new Phaser.Rectangle(
		// 	this.x * scale + this.parentX,
		// 	this.y * scale + this.parentY,
		// 	this.reelWidth * scale,
		// 	this.totalHeight/this.reelSymbolList.length * this.reelHeight * scale);
	}

	createSymbol(index, frame){
		var symbol = new Symbol(
			this.game,
			0,
			0,
			'symbols',
			frame);

		symbol.x = this.reelWidth/2;
		
		symbol.y = this.totalHeight + PiecSettings.symbolHeight/2 + this.y;
		this.totalHeight += PiecSettings.symbolHeight;

		this.add(symbol);
	}

	goToBottomOfReel() {
		this.y = (this.totalHeight - this.totalHeight/this.reelSymbolList.length * this.reelHeight) * -1;
		this.currentStopPosition = this.reelSymbolList.length - this.reelHeight;
	}

	spinToStopPosition(stopPosition, duration, delay, spread, genericBezier) {
		var bezierCurve;
		if (genericBezier)
			bezierCurve = Phaser.Easing.Back.InOut;
		else
			bezierCurve = BezierEasing(.87,-0.2,.16,1.2);

		var tween = this.game.add.tween(this).to({ y: stopPosition * PiecSettings.symbolHeight * (-1) }, duration, bezierCurve, true, delay);
		if (spread){
			tween.onComplete.add(function() {
				this.game.onReelSpinComplete.dispatch();
				this.currentStopPosition = stopPosition;
			}, this);
		}
	}

}

export default Reel;




