import SpinButton from '../prefabs/spin-button';

class SpinOverlay extends Phaser.Group {
	constructor(game) {
		super(game);

		this.dissapearing = false;
		this.container = document.getElementById("spin-overlay");

		if (this.container != null) {
			if (this.container.className.indexOf("dissapearing") != -1) {
				this.dissapearing = true;
			}
			if (this.dissapearing) {
				this.createDarkOverlay();
			}
		}
		this.spinButton = new SpinButton(game);
		this.add(this.spinButton);
	}

	createDarkOverlay() {
		var containerWidth = this.container.offsetWidth * window.devicePixelRatio;
		var containerHeight = this.container.offsetHeight * window.devicePixelRatio;
		var containerX = this.container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = this.container.getBoundingClientRect().top * window.devicePixelRatio;

		var overlay = this.game.add.bitmapData(containerWidth,containerHeight);
		var gradient = overlay.context.createLinearGradient(0,0,0,containerHeight);
		gradient.addColorStop(0, "transparent");
		gradient.addColorStop(.75, "#000");
		gradient.addColorStop(1, "#000");

		overlay.context.fillStyle = gradient;
		overlay.context.fillRect(0,0,containerWidth, containerHeight);

		this.spinOverlaySprite = this.game.add.sprite(containerX, containerY, overlay);
		this.spinOverlay = overlay;

		this.spinOverlaySprite.alpha = .7;
		this.add(this.spinOverlaySprite);
	}

	hide() {
		this.spinButton.button.inputEnabled = false;
		if (this.dissapearing || PiecSettings.spins.length == this.game.global.spin){
			var tween = this.game.add.tween(this).to({alpha: 0}, 300, Phaser.Easing.Quadratic.In, true, 0);
		}
	}

	show() {
		this.spinButton.button.inputEnabled = true;
		if (this.dissapearing && PiecSettings.spins.length != this.game.global.spin){
			var tween = this.game.add.tween(this).to({alpha: 1}, 300, Phaser.Easing.Quadratic.In, true, 0);
		}
	}
}

export default SpinOverlay;