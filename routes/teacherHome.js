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
	if(req.body.button === "Create New User"){
		createUser(req.body, res, render);
	}else if(req.body.button === "signInBtn"){
		render(req.body, res);
	}else if(req.body.button === "Back"){
		render(req.body, res);
	} 
}


var createUser = function(data, res, callback){
	database.isUsername(data.userName, function(isUsername){
		if(isUsername){
			alert("That User Name is already taken.");
		}else{
			database.addUser(data.userName, data.password, data.personType, res, callback);
		}
	})
}


var render = function(res){
	console.log("rending");
	res.render('teacherHome', {
		'userName': res.req.body.userName
	  	});
}



