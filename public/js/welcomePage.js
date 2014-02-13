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

function callback(bool){
	if(bool == 'false') $('.container h2').text("Your username and password combination is invalid.<br> Please try again.");
}
function signInBtn(e) {
	//var tempName = req.query.name;
	//var tempPwd = req.query.password;
	//isUser(tempName, tempPwd);
	//if(Users.findOne({'name':name, 'type':'student'}, function(err, userInfo))) 
		window.location.href="studentHome";
	//else window.location.href="teacherHome";
}

function newUserBtn(e) {
	console.log("clicked newuser");
	window.location.href="newUser";
}

