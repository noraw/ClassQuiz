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


function selectQuestion(e) {
	var questionID = $("#questionList").val();
	console.log(questionID);

	$("#questionID").val(questionID);
}

function signOutBtn(e) {
	window.location.href="/";
}
function homeBtn(e) {
	window.location.href="teacherHome";
}
