'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
}


function useExistingClassBtn(e) {
	console.log("existing class:");
	var classID = $("#classList").val();
	console.log(classID);
	var className = $('#'+classID).text();
	console.log(className);

	$("#classID").val(classID);
	$("#className").val(className);
}

/*
function createNewClass(e) {
	console.log("creating new class");
	var className = $("#newClassName").val();
	console.log(className);
	var userName = $("#userName").text();
	console.log(userName);
	
	$.post('/teacherHome/createClass', {userName:userName, className:className, func:"createClass"}, function(classID){
		console.log(classID);
	});
}
*/
function removeClassBtn(e) {
	window.location.href="studentClass";
}

function signOutBtn(e) {
	window.location.href="/";
}




