var database = require('./dbConnection');
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.body);
	if(req.body.button === "Publish Question"){
		render(req.body, res);
		publishQuestion(req.body);

	}else if(req.body.button === "View Results"){
		render(req.body, res);
	}

}

var publishQuestion = function(data){
	database.publishQuestion(data._id);
}


var render = function(data, res){
	console.log("viewQResult rendering");
	console.log(data);
	res.render('viewQuestionResults', {
		'className': data.className,
		'classID': data.classID,
		'userName': data.userName,
		'questionID': data._id,
		'questionText': 'testing',
	    'answers': [
	      { 'answerText': 'sdlkfjsl' }
		    ]  
  	});
}

