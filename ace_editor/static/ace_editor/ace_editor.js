window.onload = function(){
    /**
     * Find all .ace-editor elements and set them in their respective modes.
     * */
    window.editorWidgets = document.getElementsByClassName('ace-editor-widget');
    window.editor = []
    function createfunc(i) {
        return function(){
            var value = editor[i].getSession().getValue();
            var textNode = document.createTextNode(value);
            var target = editorWidgets[i].getElementsByClassName('ace_editor')[0].getAttribute('data-target');
            var textarea = document.getElementById(target);
            textarea.innerHTML = "";
            textarea.appendChild(textNode);
        };
    }
    for(var i = 0, length = editorWidgets.length; i < length; i++){
        editor[i] = ace.edit(editorWidgets[i].getElementsByClassName('ace_editor')[0].id);
        editor[i].getSession().setUseSoftTabs(true);
        /**
         * This will probably be poorly performant as the input grows to move
         * the data on every keypress, a better solution could be to detect if
         * we are inside a form element and only serialize on submit.
         * */
        editor[i].getSession().on('change', createfunc(i));
        var mode = editorWidgets[i].getElementsByClassName('ace_editor')[0].getAttribute('data-mode');
        if(mode){
            var Mode = require("ace/mode/" + mode).Mode;
            editor[i].getSession().setMode(new Mode());
        }
    }
};
