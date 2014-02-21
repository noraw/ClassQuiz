var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResultsStudent");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		database.getStudentAnswer(req.session.userName, req.query.questionList, 
			function(studentAnswer){
			var feedback = "Correct!";
			var color = "green";
			var correctAnswerText = "";
			var correctAnswer = "";
			if(studentAnswer != data.correctAnswer){
				feedback = "Incorrect";
				color = "red";
				correctAnswerText = "Correct Answer:";
				correctAnswer = data.correctAnswer;
			}
			res.render('viewQuestionResultsStudent', {
				'className': req.session.className,
				'questionText': data.text,
			    'studentAnswer': studentAnswer,
			    'correctAnswer': correctAnswer,
			    'correctAnswerText': correctAnswerText,
			    'feedback': feedback,
			    'color':color
		  	});
		});
	});
}


