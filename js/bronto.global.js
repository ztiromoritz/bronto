// Use $$(function(){ ....}) instead of jqueries $(function(){...}) to run code after loading all assets
// $$ is a holder for all global stuff.
var $$ = function(callback){
    $$.preloadCallbacks.push(callback);
}; //the game
$$.preloadCallbacks = [];
$$.init = function (){
    for(var i = 0; i<$$.preloadCallbacks.length; i++){
        if(_.isFunction($$.preloadCallbacks[i]))
            $$.preloadCallbacks[i]($$);
    }
};
//=============