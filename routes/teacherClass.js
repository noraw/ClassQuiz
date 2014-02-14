var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\n\n\nteacherClass");
	console.log(req.body);
	if(req.body.button === "Create New Class"){
		createClass(req.body, render);
	}
}


var createClass = function(data, callback){
	database.createClass(data.userName, data.className, callback);
}

var render = function(data){
	console.log("render");
	console.log(data);
	res.render('teacherClass', {
		'userName': data.userName,
		'class': data.newClassName,
		'code': data.classID
	  	});

}