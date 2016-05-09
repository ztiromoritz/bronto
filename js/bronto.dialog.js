;
(function (global) {

    var dialog = {};


    dialog.showMessages = function (messageArray, callback) {

        var currentIndex = 0;
        $('#dialog').show();
        $$.state.mode = MODE_DIALOG;

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                finish();
            }
        });

        var div = $("#dialog .message");

        var init = function (text) {
            $("#dialog").unbind('tap');
            console.log('name',$$.dino.name, text);
            if (!!text && !!$$.dino) {
                text = text.replace(/\{\{playername\}\}/g, $$.dino.name)
            }

            div.html('<span class="show"></span><span class="hide" style="visibility: hidden;">' + $.trim(text) + '</span>');

        };

        var step = function () {
            var clone = div.children().clone();
            var textShown = $(clone[0]).html();
            var textHidden = $(clone[1]).html();
            $(clone[0]).html(textShown + textHidden.substr(0, 1));
            $(clone[1]).html(textHidden.substr(1));
            $(div).html(clone);
            return (textHidden.substr(1).length > 0);
        };


        var start = function () {
            setTimeout(function () {
                if (step()) {
                    start();
                } else {
                    if (currentIndex+1 < messageArray.length) {
                        $("#dialog").on('tap', function () {
                            init(messageArray[++currentIndex]);
                            start();
                        })
                    } else {
                        $("#dialog").on('tap', function () {
                            finish();
                        })
                    }
                }
            }, 22);
        };

        var finish = function(){
            $('#dialog').hide();
            if(_.isFunction(callback))
                callback();
        };


        init(messageArray[currentIndex]);
        start();

    };
    global.dialog = dialog;

})(this);