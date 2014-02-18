var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
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
		res.render('viewQuestionResults', {
			'className': req.session.className,
			'questionID': data._id,
			'questionText': data.text,
			'answers': answers
	  	});
	});
}

