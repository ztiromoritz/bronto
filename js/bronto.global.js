// Use $$(function(){ ....}) instead of jqueries $(function(){...}) to run code after loading all assets
// $$ is a holder for all global stuff.


var MODE_MENU = 0;
var MODE_DIALOG = 1;
var MODE_RUNNING = 2;
var MODE_FIGHT = 3;
var MODE_EXPLORING = 4; //TODO:
var MODE_RESPAWN = 5;

;
(function (global) {

    var $$ = function (callback) {
        $$.preloadCallbacks.push(callback);
    }; //the game
    $$.preloadCallbacks = [];
    $$.init = function () {
        for (var i = 0; i < $$.preloadCallbacks.length; i++) {
            if (_.isFunction($$.preloadCallbacks[i]))
                $$.preloadCallbacks[i]($$, global);
        }
    };


    $$.state = {
        mode: MODE_MENU
    };

    $$.dino = null;

    global.$$ = $$;

})(this);
//=============