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

function backBtn(e) {
	window.location.href="teacherClass";
}

function homeBtn(e) {
	window.location.href="teacherHome";
}

function submitBtn(e) {
	window.location.href="teacherClass"	
}
