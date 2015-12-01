;
(function (global) {


    var dino = {};

    var npcs = _.filter(assets.kinds, function (kind) {
        return !!kind.npc;
    });

    var playable = _.filter(assets.kinds, function (kind) {
        return !!kind.playable;
    });


    /**
     target:

     var character = {
            variant: {
                        kind : o[0],
                        offsetX : o[1],
                        offsetY : o[2],
                        filename : o[3],
                        bodyWidth : o[4],
                        bodyHeight : o[5],
                        bodyOffsetX : o[6],
                        bodyOffsetY : o[7]
                     }
            name: 'Busarakam',
            level: 2,
            xp: 220,
            health: 56,
            current_health: 56,
            attack: 8,
            strength: 20,
            speed: 16,
            jump: 22
        };

     */
    function create(kind) {
        var result = {level: 1, xp: 0};
        result.name = NAMES[getRandomInt(0, NAMES.length - 1)];
        result.variant = kind.variants[getRandomInt(0, kind.variants.length - 1)];
        result.speed = roleDice(kind.speed);
        result.jump = roleDice(kind.jump);
        result.strength = roleDice(kind.jump);
        result.attack = roleDice(kind.attack);
        result.health = roleDice(kind.health);
        result.current_health = result.health;
        return result;
    };


    dino.createRandomNPC = function () {
        var kind = npcs[getRandomInt(0, npcs.length - 1)];
        console.log(kind)
        return create(kind);
    };

    dino.createRandomPlayer = function () {
        var kind = playable[getRandomInt(0, playable.length - 1)];
        return create(kind);
    };


    dino.default1 = {
        "level": 1,
        "xp": 0,
        "name": "Heidi",
        "variant": {
            "kind": "ankylo",
            "offsetX": 0,
            "offsetY": 0,
            "filename": "kind-02-06.png",
            "bodyWidth": 32,
            "bodyHeight": 32,
            "bodyOffsetX": 0,
            "bodyOffsetY": 0
        },
        "speed": 15,
        "jump": 6,
        "strength": 7,
        "attack": 4,
        "health": 18,
        "current_health": 18
    };
    dino.default2 = {
        "level": 1,
        "xp": 0,
        "name": "Chisomo",
        "variant": {
            "kind": "rex",
            "offsetX": 0,
            "offsetY": 0,
            "filename": "kind-00-02.png",
            "bodyWidth": 32,
            "bodyHeight": 32,
            "bodyOffsetX": 0,
            "bodyOffsetY": 0
        },
        "speed": 14,
        "jump": 11,
        "strength": 10,
        "attack": 4,
        "health": 16,
        "current_health": 16
    };

    dino.default3 = {
        "level": 1,
        "xp": 0,
        "name": "Amber",
        "variant": {
            "kind": "dimetrodon",
            "offsetX": 0,
            "offsetY": 0,
            "filename": "kind-01-02.png",
            "bodyWidth": 32,
            "bodyHeight": 32,
            "bodyOffsetX": 0,
            "bodyOffsetY": 0
        },
        "speed": 12,
        "jump": 5,
        "strength": 6,
        "attack": 7,
        "health": 17,
        "current_health": 17
    };

    dino.getSlot = function (index) {

        if (_.isNumber(index)) {
            switch (index) {
                case 1:
                    return dino.default1;
                case 2:
                    return dino.default2;
                case 3:
                    return dino.default3;
                default:
                    ;_;
            }
        }
        return null;
    };


    global.dino = dino;


})(this);