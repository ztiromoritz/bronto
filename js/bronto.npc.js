;
(function (global) {
    var NPC = function (game, x, y, key/*will be ignored*/, frame) {
        this.dino = dino.createRandomNPC();
        Phaser.Sprite.call(this, game, x, y, this.dino.variant.filename, frame);
        /*game.physics.arcade.enable(this);
        this.scale.x = -1; //flipped
        this.anchor.setTo(0.5, 1); //so it flips around its middle
        this.body.setSize(14, 13, 0, 0);
        this.body.bounce.y = 0.0;
        this.body.gravity.y = 600;
        this.body.collideWorldBounds = true;
        this.animations.add('run', [2, 3, 4, 5, 6, 7, 8, 9], 12, true);
        this.animations.add('jump', [2], 10, true);
        this.animations.add('idle', [0], 10, true);
        this.animations.add('hit', [0, 1], 10, true);
         //this.cursors = game.input.keyboard.createCursorKeys();
        //this.body.mass = 1;*/
        this.game = game;


        flipLeft(this);

    };

    NPC.prototype = Object.create(Phaser.Sprite.prototype);
    NPC.prototype.constructor = NPC;


    NPC.prototype.blinkKill = function (callback) {
        this.isHit = true;
        this.animations.play('hit');
        var self = this;
        setTimeout(function () {
            self.destroy();
            if (_.isFunction(callback)) {
                callback();
            }
        }, 1500);
    };

    NPC.prototype.runAway = function (callback) {
        this.destroy();
        //this.body.velocityY = -200;
        //this.isHit = true;
        //this.animations.play('run');
        //setTimeout(function () {
        //    this.kill();
        //    if (_.isFunction(callback)) {
        //        callback();
        //    }
        //}, 1500);
    };



    NPC.prototype.update = function () {
        if (!this.isHit)
            this.animations.play('idle');
    };

    global.NPC = NPC;

})(this);