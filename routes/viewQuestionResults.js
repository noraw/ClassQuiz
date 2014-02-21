var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		var answers = fillAnswers(data);
		console.log(answers);
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
	if("a. " + data.answerA == data.correctAnswer){
		answers.push({'answer': "a. " + data.answerA, 'color': 'green'});
	}else{
		answers.push({'answer': "a. " + data.answerA, 'color': ''});		
	}
	if("b. " + data.answerB == data.correctAnswer){
		answers.push({'answer': "b. " + data.answerB, 'color': 'green'});
	}else{
		answers.push({'answer': "b. " + data.answerB, 'color': ''});		
	}
	if(data.answerC != ""){
		if("c. " + data.answerC == data.correctAnswer){
			answers.push({'answer': "c. " + data.answerC, 'color': 'green'});
		}else{
			answers.push({'answer': "c. " + data.answerC, 'color': ''});		
		}
		if(data.answerD != ""){
			if("d. " + data.answerD == data.correctAnswer){
				answers.push({'answer': "d. " + data.answerD, 'color': 'green'});
			}else{
				answers.push({'answer': "d. " + data.answerD, 'color': ''});		
			}
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
		"array": [["Answers", "Number of Students"]]
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

			database.getQuestionInfo(req.query.questionID, function(questionData){
				jsonData["correctAnswer"] = questionData.correctAnswer;
				console.log(jsonData);
				res.json(jsonData);
			});
		});
	});
}