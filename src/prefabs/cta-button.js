class CtaButton extends Phaser.Group {
	constructor(game) {
		super(game);

		this.button = new Phaser.Sprite(game, 0, 0, 'cta', 0);
		this.add(this.button);

		this.fitInContainer();

		this.initialCtaWidth = this.button.width;
		this.button.inputEnabled = true;
		this.button.input.useHandCursor = true;
		this.button.events.onInputDown.add(function() {
			doSomething('download');
		});
	}

	fitInContainer() {
		this.container = document.getElementById("cta-container");
		this.containerWidth = this.container.offsetWidth * window.devicePixelRatio;
		this.containerHeight = this.container.offsetHeight * window.devicePixelRatio;
		var containerX = this.container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = this.container.getBoundingClientRect().top * window.devicePixelRatio;

		this.x = containerX;
		this.y = containerY;

		this.scale.x = this.containerWidth/this.button.width;
		this.scale.y = this.scale.x;
	}

	animate() {
		var finalContainer = document.getElementById("cta-container-final");
		var finalContainerWidth = finalContainer.offsetWidth * window.devicePixelRatio;
		var finalContainerX = finalContainer.getBoundingClientRect().left * window.devicePixelRatio;
		var finalContainerY = finalContainer.getBoundingClientRect().top * window.devicePixelRatio;

		var newScale = finalContainerWidth/this.initialCtaWidth;

		var positionTween = this.game.add.tween(this).to({x: finalContainerX, y: finalContainerY}, 1400, Phaser.Easing.Back.InOut, true, 0);
		var scaleTween = this.game.add.tween(this.scale).to({x: newScale, y: newScale}, 1400, Phaser.Easing.Back.InOut, true, 0);

	}
}

export default CtaButton;