var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		var answers = fillAnswers(data);
		res.render('viewQuestionResults', {
			'className': req.session.className,
			'classID': req.session.classID,
			'questionID': data._id,
			'questionText': data.text,
			'answers': answers
	  	});
	});
}

var fillAnswers = function(data){
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
	return answers;
}

exports.pieChartData = function(req, res){
	var answers = {};
	var jsonData = 	{
		"array": []
	};

	database.getNumStudentsInClass(req.query.classID, function(numStudents){
		console.log(numStudents);
		database.getQuestionResults(req.query.questionID, function(studentAnswers){
			for(var i=0; i<studentAnswers.length; i++){
				if(studentAnswers[i].answer in answers){
					answers[studentAnswers[i].answer] += 1;
				}else{
					answers[studentAnswers[i].answer] = 1;
				}
			}
			console.log(answers);
			var unAnswered = numStudents;
			for(var answer in answers){
				unAnswered -= answers[answer];
				jsonData.array.push([answer, answers[answer]]);
			}
			jsonData.array.push(["Unanswered", unAnswered]);
			console.log(jsonData);
			res.json(jsonData);
		});
	});
}