exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		res.render('viewQuestionResults', {
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
	submitStudentAnswer
		res.redirect("/questionResponse?questionList="+req.query.questionList);

}