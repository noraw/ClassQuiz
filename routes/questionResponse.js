var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\quesitonResponse");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		res.render('quesitonResponse', {
			'questionID': data._id,
			'questionText': data.text,
		    'aText': "a. " + data.answerA,
		    'bText': "b. " + data.answerB,
		    'cText': "c. " + data.answerC,
		    'dText': "d. " + data.answerD,
	  	});
	});
}

exports.submitStudentAnswer = function(req, res){
	database.submitStudentAnswer(req.session.userName, req.session.classID,
		req.query.questionID, function(){
		res.redirect("/viewQuestionResultsStudent?questionList="+req.query.questionID);
	});
}