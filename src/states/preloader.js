 import * as Atlas from '../atlas/index';
 import * as Util from '../utils/util';
 import * as Animations from '../animations.js';
 import * as FxRenderer from '../utils/fx-renderer.js';
 import * as CustomPngSequencesRenderer from '../utils/custom-png-sequences-renderer.js';
 import * as WinMessages from '../utils/win-messages-util.js';

 class Preloader extends Phaser.State {

     constructor() {
         super();
         this.asset = null;
     }

     preload() {
         //setup loading bar
         // this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
         // this.load.setPreloadSprite(this.asset);

         //Setup loading and its events
         this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
         this.loadResources();
         FxRenderer.preloadFx(this.game);
         // CustomPngSequencesRenderer.preloadPngSequences(this.game);
         WinMessages.preloadWinMessages(this.game);
     }

     update() {}

     loadResources() {

         this.game.load.image('logo', PiecSettings.assetsDir + 'logo.png');

         if (document.getElementById("spin-button").className.indexOf('label') != -1) {
            this.game.load.image('spin', PiecSettings.assetsDir + 'spin_button_label.png');
         } else {
            this.game.load.image('spin', PiecSettings.assetsDir + 'spin_button.png')
         }

         if (document.getElementById("win-counter-background")) {
            this.game.load.image('win-counter-background', PiecSettings.assetsDir + 'win-counter-background.png');
         }
         if (PiecSettings.tooltip != null && PiecSettings.tooltip.src != null) {
            this.game.load.image('tooltip', PiecSettings.assetsDir + PiecSettings.tooltip.src);
         }

         this.game.load.image('cta', PiecSettings.assetsDir + 'cta.png');

         this.game.global.animations = {};
         
         PiecSettings.animation = PiecSettings.animation || {};

         var defaultAnimation = {
            frameRate: 60,
            scale: 1
         };

         for (var key in Atlas.default) {
            if (Atlas.default.hasOwnProperty(key)) {

                this.game.load.atlasJSONHash(
                    key,
                    PiecSettings.assetsDir + key + '.png',
                    null,
                    Atlas.default[key]);

                this.game.global.animations[key] = Util.extend(
                    defaultAnimation,
                    PiecSettings.animation[key] || {}
                );
            }
        }
        var maxWidth = 0;
        var maxHeight = 0;
        for (var key in Atlas.default.symbols.frames) {
            if (Atlas.default.symbols.frames.hasOwnProperty(key)) {
                if (maxWidth < Atlas.default.symbols.frames[key].frame.w) {
                    maxWidth = Atlas.default.symbols.frames[key].frame.w;
                }
            }
        }
        PiecSettings.reelWidth = maxWidth;
         // this.game.load.spritesheet('some-sprite-sheet', PiecSettings.assetsDir + 'some-sprite-sheet.png', 138, 138);
         
     }

     onLoadComplete() {
         this.game.state.start('endcard');
     }
 }

 export default Preloader;
