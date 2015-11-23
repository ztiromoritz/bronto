$(function ($) {

    var ROCK = 0;
    var LEAVE = 1;
    var VOLCANO = 2;
    var OPTIONS = [$('#charRock'), $('#charLeave'), $('#charVolcano')];
    var COLORS = ["#6daa2c","#deeed6","#597dce"];
    var CLASSES = ["rock","leave","volcano" ];

    var choiceRunning = false;
    var reveal = -1; //nothing revealed
    var currentChoice = ROCK;

    function checkChoice() {
        if(choiceRunning){
            if(reveal === -1 || reveal !== currentChoice){
                currentChoice = (currentChoice + 1)%3;
                $('#oponentChoice').css('background-color', COLORS[currentChoice]);
            }else{ //reveal
                $('#oponentChoice').addClass(CLASSES[currentChoice]);
                choiceRunning = false;
            }
        }
        setTimeout(checkChoice, 300);
    }


    $.fight = {};

    $.fight.show = function () {
        $('#charRock').animate({top: "-=65px", left: '+=80px'}, 300);
        $('#charLeave').animate({left: '+=100px'}, 400);
        $('#charVolcano').animate({top: "+=65px", left: '+=80px'}, 500);
        $('#oponentChoice').animate({right: '+=100px'}, 500);
        choiceRunning = true;
    };

    $.fight.select = function (index) {
        $('.rlv').unbind("tap");
        OPTIONS[index].css('z-index','5');
        $('#charRock').animate({top: "+=65px", left: '+=20px'}, 300);
        $('#charVolcano').animate({top: "-=65px", left: '+=20px'}, 300);
    };

    $.fight.reveal = function(index) {
        reveal = index;
    };

    $.fight.reset = function (){
        $('.rlv').animate({top: "115px", left: '45px'}, 500, function(){
            $('.rlv').css('z-index','4')
        });
        $('#oponentChoice').animate({top: "115px", right: "45px"}, 500);

        $('#charFrame').on("tap", function(){
            $.fight.show();
            $('#charFrame').unbind("tap");

            $('#charRock').on("tap", function(){
                $.fight.select(ROCK);
            });
            $('#charLeave').on("tap", function(){
                $.fight.select(LEAVE);
            });
            $('#charVolcano').on("tap", function(){
                $.fight.select(VOLCANO);
            });
        });

    };

    $.fight.init = function(player, oponent){
        var fightTemplate = Handlebars.compile($$.cache.getText("fight-template"));
        console.log(fightTemplate({}));
        $('#fight_screen').html(fightTemplate({}));

        $.fight.reset();
        checkChoice();

    };

});
