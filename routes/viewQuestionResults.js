var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		res.render('viewQuestionResults', {
			'className': req.session.className,
			'questionID': data._id,
			'questionText': data.text,
		    'aText': "a. " + data.answerA,
		    'bText': "b. " + data.answerB,
		    'cText': "c. " + data.answerC,
		    'dText': "d. " + data.answerD,
	  	});
	});
}

