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

function backBtn(e) {
	window.location.href=".";
}
function radioChange(e){
	if($('input[id=studentRadio]:checked').val() == 'student'){
		console.log("studentHome")
		$("#addUserForm").attr('action','/studentHome');
	}else{
		console.log('teacherHome')
		$("#addUserForm").attr('action','/teacherHome');
	}
}

function submitBtn(e) {
	console.log($('input[name=personType]:checked').val());
	
	if ($('input[name=personType]:checked').val() == 'student') {
		window.location.href="studentHome/:userName";
	} else {
		window.location.href="teacherHome/:userName";
	}
	
}
