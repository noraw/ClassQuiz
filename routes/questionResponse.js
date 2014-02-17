var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nquesitonResponse");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		console.log(data);
		res.render('questionResponse', {
			'className': req.session.className,
			'questionID': data._id,
			'questionText': data.text,
		    'answerA': "a. " + data.answerA,
		    'answerB': "b. " + data.answerB,
		    'answerC': "c. " + data.answerC,
		    'answerD': "d. " + data.answerD,
	  	});
	});
}

exports.submitStudentAnswer = function(req, res){
	console.log(req.query);
	var selectedAnswer = req.query.answerChoices;
	database.submitStudentAnswer(req.session.userName, req.session.classID,
		req.query.questionID, selectedAnswer, function(){
		res.redirect("/viewQuestionResultsStudent?questionList="+req.query.questionID);
	});
}