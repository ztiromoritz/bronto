;
(function (global) {
    var Player = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'dino'); //TODO: spritesheet
        game.physics.arcade.enable(this);
        this.scale.x = -1; //flipped
        this.anchor.setTo(0.5, 1); //so it flips around its middle
        this.body.setSize(14, 13, 0, 0);
        this.body.bounce.y = 0.0;
        this.body.gravity.y = 600;
        this.body.collideWorldBounds = true;
        this.animations.add('run', [2,3,4,5], 10, true);
        this.animations.add('jump', [2], 10, true);
        this.animations.add('idle', [0], 10, true);
        this.body.mass = 1;
        this.game = game;
        this.cursors = game.input.keyboard.createCursorKeys();

        /*
         Object.defineProperty(this.body.touching, "down", {

         get: function () {
         return this._down;
         },
         set: function (val) {
         if(val)
         {
         console.trace();
         //debugger;
         }
         this._down = val;
         }

         });
         */
    };


    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {
        var idle = true;
        this.body.velocity.x = 0;

        if (this.cursors.left.isDown ) {
            this.body.velocity.x = -150;
            this.animations.play('run');
            flipLeft(this);
            idle = false;
        } else if (this.cursors.right.isDown ) {
            this.body.velocity.x = 150;
            this.animations.play('run');
            flipRight(this);
            idle = false;
        }
        if ((this.cursors.up.isDown )
            && (this.body.onFloor() || this.body.touching.down)) {
            this.body.velocity.y = -300;
            idle = false;
        }
        if(!(this.body.onFloor() || this.body.touching.down)){
            idle= false;
            this.animations.play('jump');
        }
        //  Stand still
        if (idle)
            this.animations.play('idle');
    };

    global.Player = Player;

})(this);