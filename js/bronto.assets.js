/**
 * Created by mo on 28.11.15.
 */
;
(function (global) {
    global.assets = {};



    global.assets.preload = function () {
        var game = $$.game;

        //Handlebar templates
        game.load.text('title-template', './tpl/title.html');
        game.load.text('credits-template', './tpl/credits.html');
        game.load.text('characterOverview-template', './tpl/characterOverview.html');
        game.load.text('character-template', './tpl/character.html');
        game.load.text('fight-template', './tpl/fight.html');
        game.load.text('empty-slot-template', './tpl/emptySlot.html');
        game.load.text('hud-template', './tpl/hud.html');

        game.load.audio('point', 'assets/sounds/point.wav');
        game.load.audio('hit', 'assets/sounds/hit.wav');
        game.load.audio('served', 'assets/sounds/cardServed.wav');
        game.load.audio('dunduun', 'assets/sounds/dunduun.wav');
        game.load.audio('win', 'assets/sounds/win.wav');
        game.load.audio('music', 'assets/music/autotracker_placeholder.wav');
        game.load.audio('fight', 'assets/music/fight.wav');


        //Map(s)
        game.load.tilemap('level1', 'assets/tiled/level1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.spritesheet('background_tileset', 'assets/pyxel/background_tileset.png', 16, 16);
        game.load.spritesheet('objects', 'assets/pyxel/object.png', 16, 16);
        game.load.spritesheet('vulcanos', 'assets/pyxel/vulcanos.png', 16, 16);
        game.load.spritesheet('bronto', 'assets/pyxel/bronto.png', 16, 16);
        //game.load.spritesheet('dino', 'assets/kinds/kind-00-02.png', 32, 32);




        //Kind spritesheets
        var spritesheets = Object.create(null); //Set to avoid dublicates;
        forEachKindVariant(function (kindVariant) {
            spritesheets[kindVariant.filename] = kindVariant.filename;
        });
        _.forEach(spritesheets, function (filename) {
            game.load.spritesheet(filename, 'assets/kinds/' + filename, 32, 32);
            game.load.image("avatar-"+filename, 'assets/kinds/avatars/' + filename);
        });

        game.load.onFileComplete.add(function (progress, key, success) {
            $('#loading').html(progress+'%');
        }, game);

        //???
        //this.stage.smoothed = false;
    };





    //translate the simple array structure
    function forEachKindVariant(callback) {
        if (_.isArray(KINDS_MAP) && _.isFunction(callback)) {
            for (var i = 0; i < KINDS_MAP.length; i++) {
                if (_.isArray(KINDS_MAP[i]) && KINDS_MAP[i].length == 8) {
                    var o = KINDS_MAP[i];
                    var kindVariant = {
                        kind: o[0],
                        offsetX: o[1],
                        offsetY: o[2],
                        filename: o[3],
                        bodyWidth: o[4],
                        bodyHeight: o[5],
                        bodyOffsetX: o[6],
                        bodyOffsetY: o[7]
                    };
                    callback(_.clone(kindVariant));
                }
            }
        }
    }


    var kinds = {
        rex: {
            health: "2d6+12",
            strength: "2d6+10",
            speed: "2d3+10",
            jump: "1d4+8",
            attack: "1d3+3" //attack
        },
        dimetrodon: {
            health: "1d6+12",
            strength: "1d6+10",
            speed: "1d6+10",
            jump: "1d2+4",
            attack: "1d6+1"
        },
        ankylo: {
            health: "2d6+12",
            strength: "2d6+12",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"
        },
        steve: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"
        },
        feather: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        },
        parasauro: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        },
        trizi: {
            health: "1d6+12",
            strength: "1d6+10",
            speed: "1d6+10",
            jump: "1d2+4",
            attack: "1d6+1"
        },
        mini: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"
        },
        wusel: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"
        },
        mammal: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        },
        timmi: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        },
        bird: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        },
        stego: {
            health: "2d6+12",
            strength: "1d6+10",
            speed: "1d6+12",
            jump: "1d4+4",
            attack: "1d3+3"//TODO
        }
    };

    _.forEach(['rex', 'ankylo', 'dimetrodon'], function (kind) {
        kinds[kind].playable = true;
    });

    _.forEach([
        "rex",
        "dimetrodon",
        "ankylo",
        "steve",
        "feather",
        "parasauro",
        "trizi",
        "mini",
        "wusel",
        //"mammal",
        // "timmi",
        // "bird",
        "stego"], function (kind) {
        kinds[kind].npc = true;
    });

    _.forEach(kinds, function (value, key) {
        value['variants'] = [];
    });

    forEachKindVariant(function (kindVariant) {
        if (_.isObject(kinds[kindVariant.kind])) {
            kinds[kindVariant.kind]['variants'].push(kindVariant);
        }
    });

    global.assets.kinds = kinds;


})(this);