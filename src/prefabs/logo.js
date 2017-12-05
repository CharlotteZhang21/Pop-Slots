class Logo extends Phaser.Group {
	constructor(game) {
		super(game);

		this.container = document.getElementById("logo");
		var containerWidth = this.container.offsetWidth * window.devicePixelRatio;
		var containerHeight = this.container.offsetHeight * window.devicePixelRatio;
		var containerX = this.container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = this.container.getBoundingClientRect().top * window.devicePixelRatio;


		this.logo = this.game.add.sprite(containerX, containerY, 'logo');
		this.add(this.logo);
		this.initialLogoWidth = this.logo.width;
		this.logo.scale.x = containerWidth / this.initialLogoWidth;
		this.logo.scale.y = this.logo.scale.x;
	}

	//Animates from "logo" container to "final-logo" container
	animate() {
		var finalContainer = document.getElementById("logo-final");
		var finalContainerWidth = finalContainer.offsetWidth * window.devicePixelRatio;
		var finalContainerX = finalContainer.getBoundingClientRect().left * window.devicePixelRatio;
		var finalContainerY = finalContainer.getBoundingClientRect().top * window.devicePixelRatio;

		var newScale = finalContainerWidth/this.initialLogoWidth;

		var positionTween = this.game.add.tween(this.logo).to({x: finalContainerX, y: finalContainerY}, 1400, Phaser.Easing.Quadratic.InOut, true, 0);
		var scaleTween = this.game.add.tween(this.logo.scale).to({x: newScale, y: newScale}, 1400, Phaser.Easing.Quadratic.InOut, true, 0);
	}
}

export default Logo;