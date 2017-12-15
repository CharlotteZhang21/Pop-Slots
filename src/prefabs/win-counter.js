import * as Util from '../utils/util';

class WinCounter extends Phaser.Group {

	constructor(game) {
		super(game);

		this.fitInContainer();  
		this.createWinCounterBackground();
		this.createWinCounter();

		this.currentValue = 0;
		this.initialWinCounterWidth = this.containerWidth;
	}

	fitInContainer() {
		this.containerWidth = document.getElementById("win-counter").offsetWidth * window.devicePixelRatio;
		this.containerHeight = document.getElementById("win-counter").offsetHeight * window.devicePixelRatio;
		this.x = (document.getElementById("win-counter").offsetLeft) * window.devicePixelRatio;
		this.y = document.getElementById("win-counter").offsetTop * window.devicePixelRatio;
	}

	createWinCounter() {

		this.fontSize = this.containerHeight * .8;

		var style = {
			font: "bold " + this.fontSize + "px " + PiecSettings.fontFamily,
		};

		this.textField = new Phaser.Text(this.game, this.containerWidth/2, this.containerHeight/2, PiecSettings.winCounterInitialValue, style);
		this.add(this.textField);
		this.textField.anchor.set(0.5, 0.5);
		this.textField.align = 'center';

		if (PiecSettings.fontColor != null) {
			this.textField.stroke = "black";
			this.textField.strokeThickness = 2;
			this.textField.fill = PiecSettings.fontColor;
			this.textField.setShadow(2,3,'rgb(0,0,0)', 0);
		} else {
			this.textField.stroke = "#ff9d1b";
			this.textField.strokeThickness = 5;

			var gradient = this.textField.context.createLinearGradient(0, 0, 0, this.textField.height);
			gradient.addColorStop(0, '#fffea5');
			gradient.addColorStop(1, '#ffab02');

			this.textField.fill = gradient;
		}
	}

	createWinCounterBackground() {
		var container = document.getElementById("win-counter-background");
		var containerWidth = container.offsetWidth * window.devicePixelRatio;
		var containerHeight = container.offsetHeight * window.devicePixelRatio;
		var containerX = container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = container.getBoundingClientRect().top * window.devicePixelRatio;

		console.log(containerX + ", " + containerY);

		this.winCounterBackground = this.game.add.sprite(containerX, containerY, 'win-counter-background');
		this.initialWinCounterBackgroundWidth = this.winCounterBackground.width;
		this.winCounterBackground.scale.x = containerWidth / this.winCounterBackground.width;
		this.winCounterBackground.scale.y = this.winCounterBackground.scale.x;

		console.log("wincounter scale" + containerWidth);
		console.log("button" + this.winCounterBackground.width);
		this.game.world.moveDown(this.winCounterBackground);
	}

	changeWinCounterTo(value, duration) {
		var speed = this.calcSpeedFromDuration(value, duration);
		this.increaseCounterTo(value, speed);

		var scaleEffect = 1.4;
		if (this.game.global.spin == PiecSettings.spins.length)
			scaleEffect = 1.7;

		var tween = this.game.add.tween(this.textField.scale).to( {x: scaleEffect,y: scaleEffect}, duration * 1/5, Phaser.Easing.Linear.None, true, duration * 1/3);
		tween.onComplete.add(function() {
			this.game.add.tween(this.textField.scale).to( {x: 1, y: 1}, duration * 1/5, Phaser.Easing.Linear.None, true, 0);
		}, this);
	}

	calcSpeedFromDuration(value, duration) {
		return Math.ceil(2.5 * (value - this.currentValue)/(duration/10));
	}

	/** Recursive method, increases win count until value has been reached every 10 ms, 
	by the amount specified in speed */
	increaseCounterTo(value, speed) {
		if (this.currentValue < value) {
			this.currentValue += speed;

			if (this.currentValue > value)
				this.currentValue = value;

			this.game.time.events.add(10, function() {
				if (PiecSettings.winCounterCommaSeparation != null && PiecSettings.winCounterCommaSeparation)
					this.textField.text = "" + Util.numberWithCommas(this.currentValue);
				else 
					this.textField.text = "" + this.currentValue;
				if (this.currentValue < value) {
					this.increaseCounterTo(value, speed);
				}
			}, this);
		}
	}

	animate() {
		this.animateWinCounterText();
		this.animateWinCounterBackground();
	}

	animateWinCounterText() {
		var finalContainer = document.getElementById("win-counter-final");
		var finalContainerWidth = finalContainer.offsetWidth * window.devicePixelRatio;
		var finalContainerX = finalContainer.getBoundingClientRect().left * window.devicePixelRatio;
		var finalContainerY = finalContainer.getBoundingClientRect().top * window.devicePixelRatio;

		var newScale = finalContainerWidth/this.initialWinCounterWidth;

		var positionTween = this.game.add.tween(this).to({x: finalContainerX, y: finalContainerY}, 1000, Phaser.Easing.Back.InOut, true, 0);
		var scaleTween = this.game.add.tween(this.scale).to({x: newScale, y: newScale}, 1000, Phaser.Easing.Back.InOut, true, 0);
	}

	animateWinCounterBackground() {
		var finalContainer = document.getElementById("win-counter-background-final");
		var finalContainerWidth = finalContainer.offsetWidth * window.devicePixelRatio;
		var finalContainerX = finalContainer.getBoundingClientRect().left * window.devicePixelRatio;
		var finalContainerY = finalContainer.getBoundingClientRect().top * window.devicePixelRatio;

		var newScale = finalContainerWidth/this.initialWinCounterBackgroundWidth;

		console.log(finalContainerWidth + ", " + this.initialWinCounterBackgroundWidth);
		console.log("new scale " + newScale);

		var positionTween = this.game.add.tween(this.winCounterBackground).to({x: finalContainerX, y: finalContainerY}, 1000, Phaser.Easing.Back.InOut, true, 0);
		var scaleTween = this.game.add.tween(this.winCounterBackground.scale).to({x: newScale, y: newScale}, 1000, Phaser.Easing.Back.InOut, true, 0);
		var positionTween = this.game.add.tween(this.winCounterBackground).to({x: finalContainerX, y: finalContainerY}, 1000, Phaser.Easing.Back.InOut, true, 0)
	}

}

export default WinCounter;