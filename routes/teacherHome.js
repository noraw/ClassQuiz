var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */
var pType;
exports.view = function(req, res){
	console.log("\n\n\n\nteacherHome");
	console.log(req.body);
	console.log(res);
	if(req.body.radio === "student"){
		pType='student';
	}else if(req.body.radio === "teacher"){
		pType='teacher';
	}
	if(req.body.button === "Submit"){
		createUser(req.body, pType, res, render);
		render(req.body, res);
	}else if(req.body.button === "signInBtn"){
		render(req.body, res);
	}else if(req.body.button === "Back"){
		render(req.body, res);
	} 
}

var createUser = function(data, type, res, callback){
	database.addUser(data.username, data.password, type, res, callback);
}


var render = function(data, res){
	console.log("rending");
	console.log(data);
	res.render('teacherHome', {
		'userName': res.req.body.userName,
		'className': data.name,
		'classID': data._id
	  	});
}



