$(function ($) {

    var ROCK = 0;
    var LEAVE = 1;
    var VOLCANO = 2;
    var OPTIONS = [$('#charRock'), $('#charLeave'), $('#charVolcano')];

    $.fight = {};

    $.fight.showRLV = function () {
        $('#charRock').animate({top: "-=65px", left: '+=80px'}, 300);
        $('#charLeave').animate({left: '+=100px'}, 400);
        $('#charVolcano').animate({top: "+=65px", left: '+=80px'}, 500);

        $('#oponentChoice').animate({right: '+=80px'}, 500);
    };



    $.fight.selectRLV = function (index) {
        $('.rlv').unbind("tap");
        OPTIONS[index].css('z-index','5');
        $('#charRock').animate({top: "+=65px", left: '+=20px'}, 300);
        $('#charVolcano').animate({top: "-=65px", left: '+=20px'}, 300);
    };

    $.fight.resetRLV = function (){
        $('.rlv').animate({top: "145px", left: '45px'}, 500, function(){
            $('.rlv').css('z-index','4')
        });
        $('#oponentChoice').animate({top: "145px", right: "45px"}, 500);

        $('#charFrame').on("tap", function(){
            $.fight.showRLV();
            $('#charFrame').unbind("tap");

            $('#charRock').on("tap", function(){
                $.fight.selectRLV(ROCK);
            });
            $('#charLeave').on("tap", function(){
                $.fight.selectRLV(LEAVE);
            });
            $('#charVolcano').on("tap", function(){
                $.fight.selectRLV(VOLCANO);
            });
        });

    };

    $.fight.resetRLV();


});
