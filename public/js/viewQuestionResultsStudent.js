'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
}

function returnBtn(e) {
	window.location.href="studentClass";	
}

function signOutBtn(e) {
	window.location.href="/";
}
function homeBtn(e) {
	window.location.href="studentHome";
}
