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

function publishBtn(e) {
	console.log("existing class:");
	var classID = $("#classList").val();
	console.log(classID);
	var className = $('#'+classID).text();
	console.log(className);

	$("#classID").val(classID);
	$("#className").val(className);
}
