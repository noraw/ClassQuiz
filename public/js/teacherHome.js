'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

$(".createClassBtn").click(function () {
	registerClick();
});

var startTime; 
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	startTime = new Date().getTime();

}

function registerClick() {
  var endTime = new Date().getTime();
  var timeSpent = endTime - startTime;

  ga('send', 'event', 'proceed', 'click', 'timeStamp', timeSpent)
}
