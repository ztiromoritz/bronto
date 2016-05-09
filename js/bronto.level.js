$$(function ($$, global) {
    var level = {};


    var VULCANO_SETTINGS = [
        {type: 'vulcano', animation: {frames:[ 0, 1, 2, 3], time: 10}},
        {type: 'lava_1', animation: {frames: [ 8, 9, 10, 11, 12, 13, 14, 15], time: 10}},
        {type: 'lava_2', animation: {frames: [16, 17, 18, 19, 20, 21, 22, 23], time: 10}},
        {type: 'lava_3', animation: {frames: [24,25, 26, 27, 28, 29, 30, 31], time: 10}},
        {type: 'lava_4', animation: {frames: [32, 33, 34, 35, 36, 37, 38, 39], time: 10}},
        {type: 'lava_5', animation: {frames: [40, 41, 42, 43, 44, 45, 46, 47], time: 10}},
        {type: 'lava_6', animation: {frames: [48, 49, 50, 51, 52, 53, 54, 55], time: 10}}
    ];

    var VULCANO_SPRITESHEET = 'vulcanos';

    level.createVulcanos = function (map) {
        var groups = Object.create({});


        _.forEach(VULCANO_SETTINGS, function (setting) {
            var group = $$.game.add.group();
            group.enableBody = true;
            map.createFromObjects('Vulcanos', getGIDs(setting.type, map)[0], VULCANO_SPRITESHEET, 0, true, false, group);
            group.callAll('animations.add', 'animations', 'vulcano', setting.animation.frames, setting.animation.time, true);
            group.callAll('animations.play', 'animations', 'vulcano');
            group.setAllChildren('body.moves', false);
            group.setAllChildren('body.immovable', true);
            groups[setting.type] = group;
        });
        return groups;
    };

    $$.level = level;
    global.level = level;
});