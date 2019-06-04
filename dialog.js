if (typeof DEMO == "undefined" || !DEMO) {
    var DEMO = {};
}

DEMO.Dialog = typeof DEMO.Dialog != 'undefined' && DEMO.Dialog ? DEMO.Dialog : function () {
    var dialog = document.createElement('div');
        
    dialog.className = 'dialog';
    dialog.style.display = 'none';
    document.body.appendChild(dialog);
    
    var render = function (o) {
        var html, i, length = (typeof o.buttons === 'undefined') ? 0 : o.buttons.length,
            button;
        
        if (typeof o === 'string') {
            html = '<p>' + o + '</p>';
        } else {
            html = '<p>' + ((o.body) ? o.body : o) + '</p>';
        }
        
        for (i = 0; i < length; i++) {
            button = o.buttons[i];
            html += '<a href="#" id="' + button.id + '">' + button.text + '</a>';
        }
        
        DEMO.DOM.setInnerHTML(dialog, html);
        dialog.style.display = 'block';
        
        activateListeners(o.buttons);
    };
    
    var activateListeners = function (buttons) {
        var i, length, button, isUndefined = DEMO.Lang.isUndefined;

        if (DEMO.Lang.isUndefined(buttons)) { return; }
        length = buttons.length;
        
        for (i = 0; i < length; i++) {
            button = buttons[i];
            if (!isUndefined(button.callback.type) && !isUndefined(button.callback.fn)) {
                DEMO.DOM.addListener(button.id, button.callback.type, button.callback.fn);
            } else {
                DEMO.DOM.addListener(button.id, 'click', button.callback);
            }
        }
        cached_buttons = buttons;
    };
    
    return {
        show : function (o) {
            render(o);
        },
        hide : function () {
            dialog.style.display = 'none';
        }
    };
}();