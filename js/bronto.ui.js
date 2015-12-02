$$(function($$,global){

    var credits = Handlebars.compile($$.game.cache.getText("credits-template"));
    var title = Handlebars.compile($$.game.cache.getText("title-template"));
    var characterOverview = Handlebars.compile($$.game.cache.getText("characterOverview-template"));
    var characterSheet = Handlebars.compile($$.game.cache.getText("character-template"));
    var emptySlot = Handlebars.compile($$.game.cache.getText("empty-slot-template"));
    var hud = Handlebars.compile($$.game.cache.getText("hud-template"));

    var ui = {};

    ui.showTitle = function(){
        $('.base_screen').hide();
        $('#dialog').hide();
        $('#ui').html(title({}));
        $('#ui').show();


        $('#button_select').on('tap', function(){
            ui.showCharacters();
        });

        $('#button_credits').on('tap', function(){
            ui.showCredits();
        });

    };


    ui.showCharacters = function(){
        $('.base_screen').hide();
        $('#ui').html(characterOverview({}));
        var dino1 = dino.default1; //TODO: fetch from local storage;
        var dino2 = dino.default2;
        var dino3 = dino.default3;
        $('#slot1').html(characterSheet({dino: dino1, slot :  1}));
        $('#slot2').html(characterSheet({dino: dino2, slot :  2}));
        $('#slot3').html(characterSheet({dino: dino3, slot :  3}));
        $('#ui').show();

        $('.character.set').on('tap', function(){
            var slot = parseInt($(this).attr('data-slot'));
            console.log('slot', slot, dino.getSlot(slot));
            $$.dino = dino.getSlot(slot);
            ui.showGame();
        });

        $('#button_title_back').on('tap', function(){
            ui.showTitle();
        });
    };

    ui.showCredits = function(){
        $('.base_screen').hide();
        $('#ui').html(credits({}));
        $('#ui').show();

        $('#button_title_back').on('tap', function(){
            ui.showTitle();
        });
    };


    ui.showDialog = function(){
        $('.base_screen').hide();
    };


    ui.showGame = function(){
        $('.base_screen').hide();
        $('#game').show();
        $$.gameHelper.startLevel();
        ui.updateHUD();
        dialog.showMessages(MESSAGES_BRONTO_INIT, function(){
            $$.state.mode = MODE_RUNNING;
            $$.sounds.music.play("",0,1,true);
        });

    };

    ui.updateHUD = function(){
        console.log($$.state.dino);
        $('#hud').html(hud({dino: $$.dino}));
    };

    ui.showFight = function(){
        $('.base_screen').hide();
        $('#fight_screen').show();
        //$$.fight.init()
    };

    ui.hideFight = function(){
        $('#fight_screen').fadeOut(300);
        $('#game').show();
    };


    $$.ui = ui;
    global.ui = ui;


});