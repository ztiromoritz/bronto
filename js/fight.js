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
        OPTIONS[index].css('z-index','5');

        $('#charRock').animate({top: "+=65px", left: '+=20px'}, 300);
        $('#charVolcano').animate({top: "-=65px", left: '+=20px'}, 300);
    };

    $.fight.resetRLV = function (){
        $('.rlv').css('z-index','4').animate({top: "145px", left: '45px'}, 500);
        $('#oponentChoice').animate({top: "145px", right: "245px"}, 500);
    }
});
