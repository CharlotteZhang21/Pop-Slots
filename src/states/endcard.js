import Logo from '../prefabs/logo';
import ReelLayout from '../prefabs/reel-layout';
import WinCounter from '../prefabs/win-counter';
import Reel from '../prefabs/reel';
import SpinOverlay from '../prefabs/spin-overlay';
import DarkOverlay from '../prefabs/dark-overlay';
import Tooltip from '../prefabs/tooltip';
import CtaButton from '../prefabs/cta-button';
import * as FxRenderer from '../utils/fx-renderer.js';
import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';
import * as WinMessages from '../utils/win-messages-util.js';

 class Endcard extends Phaser.State {

     constructor() {
         super();
     }

     create() {

        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.game.scale.setUserScale((1 / window.devicePixelRatio), (1 / window.devicePixelRatio), 0, 0);

        this.reelLayout = new ReelLayout(this.game);
        this.game.add.existing(this.reelLayout);

        this.game.onSpin.add(this.onSpin, this);
        this.game.onReelSpinComplete.add(this.onReelSpinComplete, this);
        this.game.onSpinComplete.add(this.onSpinComplete, this);
        this.pngSequencesLayer = this.game.add.group();

        this.winlinesLayer = this.game.add.group();

        this.winMessagesLayer = this.game.add.group();

        this.darkOverlay = new DarkOverlay(this.game);
        this.game.add.existing(this.darkOverlay);

        this.spinOverlay = new SpinOverlay(this.game);
        this.game.add.existing(this.spinOverlay);

        this.winCounter = new WinCounter(this.game);
        this.game.add.existing(this.winCounter);

        this.tooltip = new Tooltip(this.game, this.darkOverlay, this.spinOverlay.spinButton);
        this.game.add.existing(this.tooltip);

        this.fxEffectsLayer = this.game.add.group();

        this.logo = new Logo(this.game);
        this.game.add.existing(this.logo);


        this.cta = new CtaButton(this.game);
        this.game.add.existing(this.cta);

        if (PiecSettings.autospin != null) {
            if (PiecSettings.autospin.activateAfter != null) {
                this.game.time.events.add(PiecSettings.autospin.activateAfter, function() {
                    if (!this.game.global.userInteractedWithIEC) {
                        console.log("firing this");
                        this.game.onSpin.dispatch();
                    }
                }, this);
            } else {
                this.game.onSpin.dispatch();
            }
        }

     }

     resize() {        
         // resize code here
         location.reload();
     }

     render() {
        // render code here
     }

     onSpin() {
        if (this.game.global.spin <= PiecSettings.spins.length - 1) {
            //Clear winlines
            if (this.reelLayout.winlineGraphics != null && this.reelLayout.winlineGraphics.length > 0){
                for (var i = 0; i < this.reelLayout.winlineGraphics.length; i++) {
                    this.reelLayout.winlineGraphics[i].clear();
                }
            }
            //Clear in-reel feature symbols
            this.reelLayout.clearSymbolPatternReelFeature();
            //Spin!
            this.reelLayout.spin();
            //Decrease spins left
            this.spinOverlay.spinButton.updateSpinsLeft();
            //Hide Spin button
            this.spinOverlay.hide();
            //Hide dark overlay (if it is being shown)
            this.tooltip.hide();
        }
     }

     /** Dispatches onSpinComplete signal when all reels have stopped spinning */
     onReelSpinComplete() {
        this.game.global.reelsSpinCompleted++;
        if (this.game.global.reelsSpinCompleted == PiecSettings.reelLayout.length) {
            this.game.onSpinComplete.dispatch();
            this.game.global.reelsSpinCompleted = 0;
        }
     }

     onSpinComplete() {

        var currentSpin = this.game.global.spin-1;

        //Features
        this.reelLayout.symbolPatternReelFeature();
        this.reelLayout.respinFeature();
        // if (PiecSettings.spins[this.game.global.spin-1].pngSequence != null) {
        //     CustomPngSequencesRenderer.playPngSequence(this.game, PiecSettings.spins[this.game.global.spin-1].pngSequence, this.pngSequencesLayer);
        // }

        //Work out the delay, depending on whether we have custom png sequences and in-reel features
        var winDisplayDelay = 0;
        var finalCtaDelay = 0;
        if (PiecSettings.spins[this.game.global.spin - 1].symbolPatternFeature != null) {
            winDisplayDelay = 500;
        }
        if (PiecSettings.spins[this.game.global.spin - 1].pngSequence != null) {
            // winDisplayDelay += PiecSettings.spins[this.game.global.spin - 1].pngSequence.delay/2;
        }
        if (PiecSettings.spins[this.game.global.spin-1].respinFeature != null) {
            winDisplayDelay += 2000;
        }
        //Fx effects
        this.game.time.events.add(winDisplayDelay + 300, function() {
            if (this.game.global.spin-1 == currentSpin) {
                FxRenderer.playFx(this.game, this.fxEffectsLayer);
            }
        }, this);
        //Winlines and win counter
        this.game.time.events.add(winDisplayDelay, function() {
            if (this.game.global.spin-1 == currentSpin) {
                this.reelLayout.drawWinlines(this.winlinesLayer);
                if (PiecSettings.spins[this.game.global.spin - 1].winCounter != null)
                    this.winCounter.changeWinCounterTo(PiecSettings.spins[this.game.global.spin - 1].winCounter, 1000 * this.game.global.spin);
            }
        }, this);

        //Win Messages
        if (PiecSettings.spins[this.game.global.spin-1].winMessage != null) {
            finalCtaDelay = PiecSettings.spins[this.game.global.spin-1].winMessage.delay;
            this.game.time.events.add(finalCtaDelay, function() {
                WinMessages.playWinMessage(this.game, PiecSettings.spins[this.game.global.spin-1].winMessage, this.winMessagesLayer);
            }, this);
        }

        //Show spin button again
        var spinButtonDelay = winDisplayDelay + 300;
        if (PiecSettings.spins[this.game.global.spin-1].winlines != null)
            spinButtonDelay += 1000;
        this.game.time.events.add(winDisplayDelay, function() {
            this.spinOverlay.show();
        }, this);

        if (PiecSettings.finalOverlay != null && PiecSettings.finalOverlay.delay != null) {
            finalCtaDelay += PiecSettings.finalOverlay.delay;
        }
        finalCtaDelay += winDisplayDelay;

        //Final CTA dark overlay
        if (PiecSettings.spins.length == this.game.global.spin) {
            this.game.time.events.add(finalCtaDelay, function() {
                this.darkOverlay.show();
                this.logo.animate();
                // this.winCounter.animate();
                this.cta.animate();
            }, this);
        }

     }

     onLoop() {
        console.log("looping");
     }
 }

 export default Endcard;
