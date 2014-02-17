var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\n\n\nteacherClass");
//	console.log(req.body);
	console.log(req.session);
	database.getNewQuestionsList(req.session.classID, function(newQuestions){
		database.getPublishedQuestionsList(req.session.classID, function(publishedQuestions){
			res.render('teacherClass', {
				'className': req.session.className,
				'classID': req.session.classID,
				'newQuestions': newQuestions,
				'resultsQuestions': publishedQuestions,
				'publishError': req.query.publishError,
				'resultsError': req.query.resultsError
		  	});
		});
	});
}

exports.publishQuestion = function(req, res){
	if(req.query.questionList == "-"){
		var error = encodeURIComponent('Please select a question.');
		res.redirect('/teacherClass?publishError='+error);		
	}else{
		database.publishQuestion(req.query.questionList, function(){
			var questionID = encodeURIComponent(req.query.questionList);
			res.redirect("/viewQuestionResults?questionList="+questionID);
		});
	}
}

exports.resultsQuestion = function(req, res){
	if(req.query.questionList == "-"){
		var error = encodeURIComponent('Please select a question.');
		res.redirect('/teacherClass?resultsError='+error);		
	}else{
		res.redirect("/viewQuestionResults?questionList="+req.query.questionList);

	}
}