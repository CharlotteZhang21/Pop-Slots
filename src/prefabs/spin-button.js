class SpinButton extends Phaser.Group {
	constructor(game) {
		super(game);

		//Sprite and a text label on top
		this.button = new Phaser.Sprite(game, 0, 0, 'spin', 0);
		this.add(this.button);
		this.label = false;

		this.fitInContainer();

		if (this.container.className.indexOf("label") != -1) {
			this.createLabel();
			this.label = true;
		}

		this.button.inputEnabled = true;
		this.button.input.useHandCursor = true;
		this.button.anchor.set(0.45, 0.25);
		this.button.events.onInputDown.add(function() {
			this.game.onSpin.dispatch();
			this.game.global.userInteractedWithIEC = true;
		}, this);
	}

	fitInContainer() {
		this.container = document.getElementById("spin-button");
		this.containerWidth = this.container.offsetWidth * window.devicePixelRatio;
		this.containerHeight = this.container.offsetHeight * window.devicePixelRatio;
		var containerX = this.container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = this.container.getBoundingClientRect().top * window.devicePixelRatio;

		this.x = containerX + this.containerWidth/2;
		this.y = containerY + this.containerHeight/2;

		this.scale.x = this.containerWidth/this.button.width;
		console.log("scale/" + this.containerWidth);
		console.log("button" + this.button.width);
		this.scale.y = this.scale.x;
	}

	createLabel(){

		this.fontSize = this.button.height * .3;

		var style = {
			font: "bold " + this.fontSize + "px " + PiecSettings.fontFamily,
		};

		this.spinsLeft = PiecSettings.spins.length;

		this.textField = new Phaser.Text(this.game, (this.button.width)/6, this.button.height/4.2, this.spinsLeft, style);
		this.textField.anchor.set(0.5);
		this.add(this.textField);
		this.textField.align = 'center';
		this.textField.fill = PiecSettings.fontColor;
		this.textField.setShadow(2,3,'rgb(0,0,0)', 0);
	}

	updateSpinsLeft() {
		if (this.label) {
			this.spinsLeft = PiecSettings.spins.length - this.game.global.spin;
			this.textField.text = this.spinsLeft;
		}
	}

	startIdleAnimation() {
		// this.idleTween = this.game.add.tween(this.scale).to({x:.99,y:.99}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
		// this.scale.x = 1;
		// this.scale.y = 1;
	}

	stopIdleAnimation() {
		this.game.tweens.remove(this.idleTween);
	}

}

export default SpinButton;