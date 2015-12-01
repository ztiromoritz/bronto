$(function () {

    var tileLayer;
    var backgroundLayer;
    var enemiesGroup;

    var player;


    function create() {

        $('#loading').hide();
        $('#background').hide();

        $$.game.stage.smoothed = false;
        $$.init();
        $$.game.renderer.renderSession.roundPixels = true;


        $$.game.physics.startSystem(Phaser.Physics.ARCADE);


        $$.sounds = {};
        $$.sounds.served = $$.game.add.audio('served');
        $$.sounds.served.allowMultiple = true;
        $$.sounds.point = $$.game.add.audio('point');
        $$.sounds.point.allowMultiple = true;
        $$.sounds.hit = $$.game.add.audio('hit');
        $$.sounds.hit.allowMultiple = true;
        $$.sounds.dunduun = $$.game.add.audio('dunduun');
        $$.sounds.dunduun.allowMultiple = true;
        $$.sounds.win = $$.game.add.audio('win');
        $$.sounds.win.allowMultiple = true;
        $$.sounds.fight = $$.game.add.audio('fight');
        $$.sounds.fight.allowMultiple = true;
        $$.sounds.music = $$.game.add.audio('music');
        $$.sounds.music.allowMultiple = true;

        $$.game.paused = false;
    }

    function update() {

        if (player)
            $$.game.physics.arcade.collide(player, tileLayer);
        //better stop physics in all modes but running
        //TODO

        if ($$.state.mode === MODE_RUNNING) {


            function win(enemy) {
                return function win() {
                    $$.sounds.fight.fadeOut(1300);
                    $$.sounds.win.play();
                    $$.ui.hideFight();
                    enemy.blinkKill(function(){
                        $$.state.mode = MODE_RUNNING;
                        $$.sounds.music.play("", 0, 1, true);
                    });
                };
            }

            function lose(enemy) {
                return function () {
                    enemy.runAway();
                    $$.sounds.fight.fadeOut(1300);
                    $$.ui.hideFight();
                    setTimeout(function(){
                        $$.state.mode = MODE_RUNNING;
                        $$.sounds.music.play("", 0, 1, true);
                    }, 1500)
                };
            }


            //Check for fight

            if (!!enemiesGroup && !!player) {
                enemiesGroup.forEach(function (enemy) {
                    if ($$.game.physics.arcade.distanceBetween(player, enemy) < 80) {
                        $$.state.mode = MODE_FIGHT;
                        $$.sounds.music.fadeOut(1000);
                        $$.sounds.dunduun.play("",0,0.6);
                        setTimeout(function () {
                            $$.sounds.fight.play("", 0, 0.3, true);
                            $$.ui.showFight();
                            $$.fight.init(player.dino, enemy.dino, win(enemy), lose(enemy));
                        }, 2500);

                    }
                });
            }
        }


    }


    $$.gameHelper = {};
    $$.gameHelper.startLevel = function () {
        var map = $$.game.add.tilemap('level1');
        map.addTilesetImage('background_tileset', 'background_tileset');
        map.addTilesetImage('objects', 'objects');
        map.addTilesetImage('bronto', 'bronto');

        backgroundLayer = map.createLayer('Background');
        backgroundLayer.scrollFactorX = 0.7;
        backgroundLayer.alpha = 0.7;

        tileLayer = map.createLayer('Ground');

        tileLayer.resizeWorld();
        map.setCollision(getGIDs('solid', map, "solid"), true, tileLayer);

        player = new Player($$.game, 135, 272, $$.dino);
        $$.game.add.existing(player);
        $$.game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);
        flipLeft(player);
        $$.game.physics.arcade.enable(tileLayer);


        //Place random enemies
        enemiesGroup = $$.game.add.group();
        _.forEach(map.getTileinfoByProperty('randomEnemie'), function (tileinfo) {
            map.createFromObjects('Enemies', tileinfo.gid, 'dont care', 0, true, false, enemiesGroup, NPC);
        });


    };

    $$.game = new Phaser.Game(480, 320,
        Phaser.AUTO,
        'game',
        {preload: assets.preload, create: create, update: update},
        true, //transparent
        true   //antialias
    );

})
;