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
	window.location.href="teacherClass";
}


function createNewClass(e) {
	console.log("creating new class");
	var className = $("#newClassName").val();
	console.log(className);
	var userName = $("#userName").text();
	console.log(userName);
	
	$.post('/teacherHome/createClass', {userName:userName, className:className}, function(classID){
		console.log(classID);
	});
	/*
	dbConnection.createClass(userName, className, function(classID){
		$.post('teacherClass', {newClass:className, classID:classID});
	});
	*/
	//window.location.href="teacherClass";
}

function removeClassBtn(e) {
	window.location.href="teacherClass";
}

function signOutBtn(e) {
	window.location.href="/";
}


