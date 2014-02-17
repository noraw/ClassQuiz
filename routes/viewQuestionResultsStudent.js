var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResultsStudent");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		database.getStudentAnswer(req.session.userName, req.query.questionList, 
			function(studentAnswer){
			res.render('viewQuestionResultsStudent', {
				'className': req.session.className,
				'questionText': data.text,
			    'studentAnswer': studentAnswer,
			    'correctAnswer': data.correctAnswer
		  	});
		});
	});
}


