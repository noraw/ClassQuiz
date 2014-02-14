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
		createClass(req.body, res, render);
	}else if(req.body.button === "Use Existing Class"){
		render(req.body, res);
	}
}


var createClass = function(data, res, callback){
	database.createClass(data.userName, data.newClassName, res, callback);
}

var render = function(data, res){
	res.render('teacherClass', {
		'userName': res.req.body.userName,
		'class': data.name,
		'code': data._id
	  	});

}