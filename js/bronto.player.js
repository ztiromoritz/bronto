;
(function (global) {
    var Player = function (game, x, y, dino) {

        Phaser.Sprite.call(this, game, x, y, dino.variant.filename);
        game.physics.arcade.enable(this);
        this.dino = dino;
        this.scale.x = -1; //flipped
        this.anchor.setTo(0.5, 1); //so it flips around its middle
        //this.body.setSize(14, 13, 0, 0);
        this.body.bounce.y = 0.0;
        this.body.gravity.y = 600;
        this.body.collideWorldBounds = true;
        this.animations.add('run', [2,3,4,5,6,7,8,9], 12, true);
        this.animations.add('jump', [2], 10, true);
        this.animations.add('idle', [0], 10, true);
        this.animations.add('hit', [0,1], 10, true);
        this.body.mass = 1;
        this.game = game;
        this.cursors = game.input.keyboard.createCursorKeys();

    };


    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.update = function () {

        if($$.state.mode === MODE_DIALOG || $$.state.mode === MODE_FIGHT){
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.play('idle');
        } else if($$.state.mode === MODE_RUNNING){
            flipRight(this);
            this.body.velocity.x = 180;
            this.animations.play('run');
            if ((this.cursors.up.isDown || this.game.input.pointer1.isDown)
                && (this.body.onFloor() || this.body.touching.down)) {
                this.body.velocity.y = -300;
                idle = false;
                this.animations.play('jump');
            }

            if(!(this.body.onFloor() || this.body.touching.down)){
                idle= false;
                this.animations.play('jump');
            }

        } else if($$.state.mode === MODE_EXPLORING){
            //Kind of a debug mode for now
            var idle = true;
            this.body.velocity.x = 0;

            if(this.cursors.left.isDown){
                this.body.velocity.x = -180;
                idle = false;
                flipLeft(this);
                this.animations.play('run');
            }

            if(this.cursors.right.isDown){
                this.body.velocity.x = 180;
                idle = false;
                flipRight(this);
                this.animations.play('run');
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

            if(idle){
                this.animations.play('idle');
            }
        }


    };

    global.Player = Player;

})(this);