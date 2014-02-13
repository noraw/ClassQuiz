'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('#CreateNewClass').click(CreateNewClass);
}


function UseExistingClassBtn(e) {
	window.location.href="teacherClass";
}

var newClassID;
function callback(classID) {
	newClassID = classID;
}

function CreateNewClass(e) {
	$.get('teacherClass', createClass);
	//window.location.href="teacherClass";
}

function RemoveClassBtn(e) {
	window.location.href="teacherClass";
}

function SignOutBtn(e) {
	window.location.href="/";
}


