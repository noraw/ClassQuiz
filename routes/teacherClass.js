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
	//console.log(res);
	if(req.body.button === "Create New Class"){
		createClass(req.body, res, render);
	}else if(req.body.button === "Use Existing Class"){
		render(req.body, res);
	}else if(req.body.button === "Back"){
		render(req.body, res);
	}else if(req.body.button === "Submit Question"){
		render(req.body, res);
		createQuestion(req.body);
	}
}


var createClass = function(data, res, callback){
	database.createClass(data.userName, data.newClassName, res, callback);
}

var createQuestion = function(data){
	database.addQuestion(data._id, data.questionText, data.aText, data.bText, data.cText, data.dText, data.dText);
}

var render = function(data, res){
	console.log("rendering teacherClass");
	console.log(data);
	var classID;
	var className;
	if(data.classID != null){
		classID = data.classID;
	}else{
		classID = data._id;
	}
	if(data.className != null){
		className = data.className;
	}else{
		className = data.name
	}
	res.render('teacherClass', {
		'userName': res.req.body.userName,
		'className': className,
		'classID': classID
	  	});
}