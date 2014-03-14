'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $('legend').click(function(){
        $(this).parent().find('.content').slideToggle("slow");
        var text = $(this).text();
        if(text.indexOf("Click to ") == -1){
    		text = "Click to " + text
    		$(this).text(text);
        }else{
    		text = text.replace("Click to ","");
    		$(this).text(text);
        }
    });
}
