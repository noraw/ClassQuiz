var database = require('./dbConnection');
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\n\n\studentClass");
//	console.log(req.body);
	console.log(req.session);
	database.getPublishedQuestionsListUnanswered(req.session.classID, function(answerQuestions){
		database.getPublishedQuestionsListAnswered(req.session.classID, function(resultsQuestions){
			res.render('studentClass', {
				'className': req.session.className,
				'classID': req.session.classID,
				'newQuestions': answerQuestions,
				'resultsQuestions': resultsQuestions,
				'answerError': req.query.publishError,
				'resultsError': req.query.resultsError
		  	});
		});
	});
}



exports.answerQuestion = function(req, res){
	if(req.query.questionList == "-"){
		var error = encodeURIComponent('Please select a question.');
		res.redirect('/studentClass?answerError='+error);		
	}else{
		res.redirect("/questionResponse?questionList="+req.query.questionList);
	}
}

exports.resultsQuestionStudent = function(req, res){
	if(req.query.questionList == "-"){
		var error = encodeURIComponent('Please select a question.');
		res.redirect('/studentClass?resultsError='+error);		
	}else{
		res.redirect("/viewQuestionResultsStudent?questionList="+req.query.questionList);

	}
}