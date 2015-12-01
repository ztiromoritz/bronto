$$(function ($$) {

    var DEBUG = true;
    var BART_SIMPSON = false;

    var PLAYER = 0;
    var OPPONENT = 1;
    var RESULT = 2; //1 x 2
    var ROCK = 0;
    var LEAVE = 1;
    var VOLCANO = 2;
    var OPTION_NAMES = ['Rock', 'Leave', 'Volcano'];
    var OPTIONS; //[$('#charRock'), $('#charLeave'), $('#charVolcano')];

    var COLORS = ["#6daa2c", "#deeed6", "#597dce"];
    var CLASSES = ["rock", "leave", "volcano"];

    var RLV_INIT = {
        top: "115px",
        left: '45px',
        width: '60px',
        height: '60px',
        'z-index': '4'
    };

    var OPPONENT_CHOICE_INIT = {
        top: "115px",
        right: "45px",
        width: '60px',
        height: '60px',
        'z-index': '4'
    };


    var POINT_POSITIONS = [
        [{ // * PLAYER * //
            left: '20px',
            top: '200px',
            width: '16px',
            height: '16px'
        }, {
            left: '40px',
            top: '200px',
            width: '16px',
            height: '16px'
        }, {
            left: '60px',
            top: '200px',
            width: '16px',
            height: '16px'
        }],
        [{ // * OPPONENT * //
            right: '20px',
            top: '200px',
            width: '16px',
            height: '16px'
        }, {
            right: '40px',
            top: '200px',
            width: '16px',
            height: '16px'
        }, {
            right: '60px',
            top: '200px',
            width: '16px',
            height: '16px'
        }]
    ];

    var MESSAGES = [
        "Rock closes Volcano.",
        "Leave wraps Rock.",
        "Volcano burns Leave.",
        "Draw. Try again."
    ];

    var choiceRunning = false;
    var reveal = -1; //nothing revealed
    var revealCallback;
    var currentChoice = ROCK;
    var playersChoice = -1;
    var gameState = [];
    var currentPlayer;
    var currentOpponent;
    var winCallback;
    var loseCallback;

    function checkChoice() {
        if (choiceRunning) {
            if (reveal === -1 || reveal !== currentChoice) {
                currentChoice = (currentChoice + 1) % 3;
                $('#opponentChoice').css('background-color', COLORS[currentChoice]);
            } else { //reveal
                $('#opponentChoice').addClass(CLASSES[currentChoice]);
                if (_.isFunction(revealCallback)) {
                    revealCallback();
                    revealCallback = null;
                }
                choiceRunning = false;
            }
        }
        setTimeout(checkChoice, 300);
    }

    checkChoice();

    function getCurrentResult() {
        return _.reduce(gameState, function (memo, element) {
            if (element[RESULT] === '1') {
                return [memo[0] + 1, memo[1], memo[2]];
            } else if (element[RESULT] === '2') {
                return [memo[0], memo[1] + 1, memo[2]];
            } else {
                return [memo[0], memo[1], memo[2] + 1];
            }
        }, [0, 0, 0]);
    }

    function log(msg) {
        if (DEBUG)
            console.log(msg);
    }

    $$.fight = {};

    $$.fight.show = function () {
        log('show');
        setTimeout(function(){ $$.sounds.served.play()}, 0);
        setTimeout(function(){ $$.sounds.served.play()}, 100);
        setTimeout(function(){ $$.sounds.served.play()}, 200);
        setTimeout(function(){ $$.sounds.served.play()}, 300);
        $('#charRock').animate({top: "-=65px", left: '+=80px'}, 300 );
        $('#charLeave').animate({left: '+=100px'}, 400);
        $('#charVolcano').animate({top: "+=65px", left: '+=80px'}, 500);
        $('#opponentChoice').animate({right: '+=100px'}, 550);
        choiceRunning = true;

        $('#charRock').on("tap", function () {
            $$.fight.select(ROCK);
        });
        $('#charLeave').on("tap", function () {
            $$.fight.select(LEAVE);
        });
        $('#charVolcano').on("tap", function () {
            $$.fight.select(VOLCANO);
        });

    };

    $$.fight.select = function (index) {
        log('select');
        playersChoice = index;
        gameState.push([index, -1]);
        $('.rlv').unbind("tap");
        OPTIONS[index].css('zIndex', 7);
        setTimeout(function(){ $$.sounds.served.play()}, 0);
        $('#charRock').animate({top: "+=65px", left: '+=20px'}, 300);
        $('#charVolcano').animate({top: "-=65px", left: '+=20px'}, 300);
        setTimeout(function () {
            $$.fight.message(currentPlayer.name + " chooses " + OPTION_NAMES[index]);
        }, 300);
        setTimeout(function () {
            $$.fight.randomChoose();
        }, 1000)
    };


    $$.fight.randomChoose = function () {
        log('randomChoose');
        var index;
        switch (currentOpponent.strategy) {
            default:
                index = getRandomInt(0, 2);
        }
        if (BART_SIMPSON)
            index = 0;
        $$.fight.reveal(index, function () { //Callback fired by checkChoice() polling
            setTimeout(function(){ $$.sounds.served.play()}, 0);
            $$.fight.message(currentOpponent.name + " choose " + OPTION_NAMES[index]);
            gameState[gameState.length - 1][1] = index;
            $$.fight.evaluate();
        });
    };

    $$.fight.reveal = function (index, callback) {
        log('reveal');
        reveal = index;
        revealCallback = callback;
    };


    $$.fight.evaluate = function () {
        log('evaluate');
        var lastSet = gameState[gameState.length - 1];
        var message;
        if (lastSet[PLAYER] === lastSet[OPPONENT]) {
            lastSet.push('x'); //draw
            message = MESSAGES[3];
        } else if ((lastSet[OPPONENT] + 1) % 3 === lastSet[PLAYER]) {
            lastSet.push('1'); //player wins
            message = MESSAGES[lastSet[PLAYER]];
        } else {
            lastSet.push('2'); //opponent wins
            message = MESSAGES[lastSet[OPPONENT]];
        }
        setTimeout(function () {
            $$.fight.message(message);
            $$.fight.finishRound();
        }, 700);

    };


    $$.fight.finishRound = function () {
        log('finishRound');
        var lastSet = gameState[gameState.length - 1];
        var currentResult = getCurrentResult();


        function meetInMiddle(callback) {
            log('meetInMiddle');
            $('.rlv').animate({
                left: "210px"
            }, 500);


            $('#opponentChoice').animate({
                right: "210px"
            }, 500, callback);
        }

        function opponentWins() {
            log('opponentWins');
            var pointPosition = POINT_POSITIONS[OPPONENT][currentResult[OPPONENT] - 1];
            //Reset rlv
            $('.rlv').css(RLV_INIT);
            $$.sounds.hit.play();
            $('#opponentChoice').animate(pointPosition, 400, function () {
                $('#opponentPoint' + currentResult[OPPONENT]).animate({opacity: 1}, 300, function () {
                    $('#opponentChoice').css(OPPONENT_CHOICE_INIT);
                    $$.fight.startOver(false);
                });
            });
        }

        function playerWins() {
            log('playerWins');
            var pointPosition = POINT_POSITIONS[PLAYER][currentResult[PLAYER] - 1];
            //Reset opponent
            $('#opponentChoice').css(OPPONENT_CHOICE_INIT);
            $$.sounds.point.play();
            //Move to point
            var once = true;
            $('.rlv').animate(pointPosition, 400, function () {
                if (once) {
                    once = false; //callback for every element
                    $('#charPoint' + currentResult[PLAYER]).animate({opacity: 1}, 300, function () {
                        $('.rlv').css(RLV_INIT);
                        $$.fight.startOver(false);
                    });
                }
            });
        }

        if (lastSet[RESULT] === '1') {
            OPTIONS[playersChoice].css('zIndex', 7);
            meetInMiddle(playerWins);
        } else if (lastSet[RESULT] === '2') {
            $('#opponentChoice').css('zIndex', 7);
            meetInMiddle(opponentWins);
        } else {
            $$.fight.startOver(true);
        }
    };

    $$.fight.startOver = function (draw) {
        log('startOver');
        if (!draw) {
            //check Result;
            var currentResult = getCurrentResult();
            if (currentResult[PLAYER] >= 3) {

                $$.fight.message("You win.");
                $$.sounds.win.play();
                setTimeout(function () {

                    if (winCallback)
                        winCallback();
                }, 500);
                return;
            } else if (currentResult[OPPONENT] >= 3) {

                $$.fight.message("You lose.");
                setTimeout(function () {
                    //TODO: PLAYER lose health
                    if (loseCallback)
                        loseCallback();
                }, 500);
                return;
            }
        }
        $$.fight.reset(function () {
            $$.fight.show();
        });

    };

    $$.fight.reset = function (callback) {
        log('reset');
        $('.rlv').animate(RLV_INIT, 500, function () {
            $(this).css('z-index', '4')
        });
        $('#opponentChoice').animate(
            OPPONENT_CHOICE_INIT, 505, function () {
                //compare to checkChoice();
                $('#opponentChoice').removeClass(CLASSES[currentChoice]);
                choiceRunning = false;
                reveal = -1; //nothing revealed
                revealCallback = null;
                playersChoice = -1;
                if (callback)
                    callback();
            });
    };

    $$.fight.message = function (message) {
        $("#fightMessage").html(message);
    };

    $$.fight.init = function (player, opponent, win, lose) {
        log('init');
        winCallback = win;
        loseCallback = lose;

        currentPlayer = player;
        currentOpponent = opponent;
        var fightTemplate = Handlebars.compile($$.game.cache.getText("fight-template"));
        $('#fight_screen').html(fightTemplate({player: player, opponent: opponent}));
        OPTIONS = [$('#charRock'), $('#charLeave'), $('#charVolcano')];
        $$.fight.message(player.name + " is challanged by " + opponent.name);
        gameState = [];

        $$.fight.reset(function () {
            $$.fight.show();
        });
    };

});
