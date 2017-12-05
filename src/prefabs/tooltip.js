class Tooltip extends Phaser.Group {
	constructor(game, overlay, spinButton) {
		super(game);

		this.tooltip = false;
		this.spinButton = spinButton;

		if (PiecSettings.tooltip != null) {
			this.createTooltip();
			this.startIdleAnimation();
			this.spinButton.startIdleAnimation();
			this.tooltip = true;
			this.darkOverlay = overlay;
			this.darkOverlay.alpha = .5;
		}
	}

	createTooltip() {
		var container = document.getElementById("tooltip");
		var containerWidth = container.offsetWidth * window.devicePixelRatio;
		var containerHeight = container.offsetHeight * window.devicePixelRatio;		
		var containerX = container.getBoundingClientRect().left * window.devicePixelRatio;
		var containerY = container.getBoundingClientRect().top * window.devicePixelRatio;

		if (PiecSettings.tooltip.src == null && PiecSettings.tooltip.text != null){
			//If no src field has been specified, we take the text one

			this.fontSize = containerHeight * .2;

			var style = {
				font: "bold " + this.fontSize + "px " + PiecSettings.fontFamily,
			}

			console.log(PiecSettings.tooltip.text);

			this.textField = new Phaser.Text(this.game, 0,0, PiecSettings.tooltip.text, style);
			this.add(this.textField);
			this.textField.anchor.set(0.5,0.5);
			this.textField.align = 'center';

			if (PiecSettings.tooltip.fontColor != null) {

				this.textField.fill = PiecSettings.tooltip.fontColor;

			} else {

				//Default golden gradient fill

				this.textField.stroke = "#ff9e1c";
				this.textField.strokeThickness = 5;
				var gradient = this.textField.context.createLinearGradient(0, 0, 0, this.textField.height);
				gradient.addColorStop(0, '#fffea5');
				gradient.addColorStop(.5, '#ffad17');
				gradient.addColorStop(.55, '#fffea5');
				gradient.addColorStop(1, '#ffad17');

				this.textField.fill = gradient;
			}

		} else if (PiecSettings.tooltip.src != null) {
			this.tooltip = this.game.add.sprite(0,0,'tooltip');
			this.add(this.tooltip);
			this.tooltip.anchor.set(0.5);
			this.tooltip.scale.y = containerHeight / this.tooltip.height;
			this.tooltip.scale.x = this.tooltip.scale.y;
		}

		this.x = containerX + containerWidth/2;
		this.y = containerY + containerHeight/2.5;
	}

	startIdleAnimation() {
		var tween = this.game.add.tween(this.scale).to({x:.9,y:.9}, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
	}

	hide() {
		if (this.tooltip) {
			this.darkOverlay.hide();
			this.spinButton.stopIdleAnimation();
			var tween = this.game.add.tween(this).to({alpha: 0}, 500, Phaser.Easing.Quadratic.Out, true, 0);
		}
	}
}

export default Tooltip;