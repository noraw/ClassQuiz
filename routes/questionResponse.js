var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nquesitonResponse");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		console.log(data);
		var answers = [];
		answers.push({'answer': "a. " + data.answerA});
		answers.push({'answer': "b. " + data.answerB});
		if(data.answerC != ""){
			answers.push({'answer': "c. " + data.answerC});
			if(data.answerD != ""){
				answers.push({'answer': "d. " + data.answerD});
				answers.push({'answer': "e. I don't know"});
			}else{
				answers.push({'answer': "d. I don't know"});
			}
		}else{
			answers.push({'answer': "c. I don't know"});
		}

		res.render('questionResponse', {
			'className': req.session.className,
			'questionID': data._id,
			'questionText': data.text,
		    'answers': answers
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