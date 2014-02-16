var mongoose = require('mongoose');
var database = require('./database.js');

// takes in the username and password and 
// returns true if the user exists and false otherwise
exports.isUser = function(name, pwd, callback){
	var userInfo = [];
	console.log("isUser(" +name+ ", "+pwd+")");
	database.Users.findOne({'name':name, 'pwd':pwd}, function(err, userInfo){
		if(err){console.log(err)}else{
			if(userInfo == null){
				console.log("isUser(" +name+ "): false");
				callback(false, userInfo);
			}else{
				console.log("isUser(" +name+ "): true");
				callback(true, userInfo);
			}
		}
	});
}

// Checks to see if the username is already taken by someone else
// return true if taken, false if free
exports.isUsername = function(name, callback){
	var userInfo = [];
	database.Users.findOne({'name':name}, function(err, userInfo){
		if(err){console.log(err)}else{
			console.log(userInfo);
			if(userInfo == null){
				console.log("isUsername(" +name+ "): false");
				callback(false);
			}else{
				console.log("isUsername(" +name+ "): true");
				callback(true);
			}
		}
	});
}

// adds the user to the database
// returns true if successful false if failed.
exports.addUser = function(name, pwd, type, callback){
	var userData = {
		name: name,
		pwd: pwd,
		type: type
	};
	console.log("UserData");
	console.log(userData);
	var newUser = new database.Users(userData);
	newUser.save(function(err, data){
		if(err){console.log(err)}else{
			console.log("addUser: successful");
			callback();
		}
	});
}

// creates a new class and sets the teacher as enrolled in that class
// returns the classId
exports.createClass = function(userName, className, res, callback){
	var classData = {
		name: className
	};
	var newClass = new database.Classes(classData);
	newClass.save(function(err, data){
		if(err){console.log(err)}else{
			database.Users.findOne({'name':userName}, function(err, user){
				if(err){console.log(err)}else{
					user.classesIDArray.push(newClass);
					user.save(function(err){
						if(err){console.log(err)}else{
							console.log("createClass("+userName+", "+className+"): classID - "+ data._id);
							callback(data, res);
						}
					});
				}
			});
		}
	});
}

// adds the class to the user's list of classes
// returns True if successful, false otherwise
exports.enrollInClass = function(userName, classID){
	database.Users.findOne({'name':userName}, function(err, user){
		if(err){console.log(err)}else{
			user.classesIDArray.push(classID);
			user.save(function(err){
				if(err){console.log(err)}else{
					console.log("enrollInClass: successful");
				}
			});
		}
	});
}


// get all the classes that the user either teaches or is enrolled in
// returns a json with the class name and class id
exports.getUsersClassesNames = function(userName, callback){
	database.Users.findOne({'name':userName})
	.populate('classesIDArray')
	.exec(function(err, user){
		if(err){console.log(err)}else{
			console.log(user);
			if(user != null){
				console.log("getUsersClassesNames("+userName+"): "+user.classesIDArray);
				callback(user.classesIDArray);
			}
		}
	});
}

// creates a question and adds it to the class
// return true if successful and false otherwise
exports.addQuestion = function(classID, questionText, answerA, answerB, answerC, answerD, correctAnswer){
	var questionData = {
		classID: classID,
		text: questionText,
		answerA: answerA,
		answerB: answerB,
		answerC: answerC,
		answerD: answerD,
		correctAnswer: correctAnswer,
		//date: new Date(),
		isPublished: false
	}
	var newQuestion = new database.Questions(questionData);
	newQuestion.save(function(err, data){
		if(err){console.log(err)}
	});
	// still need to update quiz to point to question
	database.Classes.findOne({'_id':classID}, function(err, classData){
		if(err){console.log(err)}else{
			classData.questionIDs.push(newQuestion);
			classData.save(function(err){
				if(err){console.log(err)}else{
					console.log("addQuestion: successful");
				}
			});
		}
	});
}

// changes the question's published status to true
// returns true if successful, false otherwise
exports.publishQuestion = function(questionID){
	database.Questions.findOne({'_id':questionID}, function(err, questionData){
		if(err){console.log(err)}else{
			questionData.update({'isPublished':true}, function(err){
				if(err){console.log(err)}else{
					console.log("publishQuestion: successful");
				}
			});
		}
	});
}

// gets all the unpublished questions in a class
// calls the callback function each time for a found question
exports.getNewQuestionsList = function(classID, callback){
	database.Classes.findOne({'_id':classID})
	.populate('questionIDs')
	.exec(function(err, classData){
		if(err){console.log(err)}else{
			var questions = [];
			if(classData != null){
				for(var i=0; i < classData.questionIDs.length; i++){
					if(classData.questionIDs[i].isPublished == false){
						questions.push(classData.questionIDs[i]);
					}
				}
			}
			console.log("getNewQuestionsList("+classID+"): "+questions);
			callback(questions);
		}
	});
}

// gets all the published questions in a class
// returns a list of classNames and classIDs
var getPublishedQuestionsListPrivate = function(classID, callback){
	database.Classes.findOne({'_id':classID})
	.populate('questionIDs')
	.exec(function(err, classData){
		if(err){console.log(err)}else{
			var questions = [];
			if(classData != null){
				for(var i=0; i < classData.questionIDs.length; i++){
					if(classData.questionIDs[i].isPublished == true){
						questions.push(classData.questionIDs[i]);
					}
				}
			}
			console.log("getPublishedQuestionsListPrivate("+classID+"): "+questions);
			callback(questions);
		}
	});
}
exports.getPublishedQuestionsList = getPublishedQuestionsListPrivate;

// gets all the published questions in a class that the student has not answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListUnanswered = function(userName, classID, callback){
	getPublishedQuestionsListPrivate(classID, function(questions){
		database.StudentAnswers.find({studentName:userName, classID:classID})
		.exec(function(err, studentAnswers){
			if(err){console.log(err)}else{
				if(studentAnswers == null){
					callback(questions);
				}
				var unAnsweredQuestions = [];
				for(var i=0; i<questions.length; i++){
					var foundAnswer = false
					for(var j=0; j<studentAnswers.length; j++){
						if(questions[i]._id == studentAnswers[j].questionID){
							foundAnswer = true;
							break;
						}
					}
					if(!foundAnswer){
						unAnsweredQuestions.push(questions[i]);
					}
				}
				console.log("getPublishedQuestionsListUnanswered("+userName+", "+classID+"): "+unAnsweredQuestions);
				callback(unAnsweredQuestions);
			}
		});
	});
}

// gets all the published questions in a class that the student has answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListAnswered = function(userName, classID, callback){
	getPublishedQuestionsListPrivate(classID, function(questions){
		database.StudentAnswers.find({studentName:userName, classID:classID})
		.exec(function(err, studentAnswers){
			if(err){console.log(err)}else{
				if(studentAnswers == null){
					callback([]);
				}
				var answeredQuestions = [];
				for(var i=0; i<questions.length; i++){
					for(var j=0; j<studentAnswers.length; j++){
						if(questions[i]._id == studentAnswers[j].questionID){
							answeredQuestions.push(questions[i]);
							break;
						}
					}
				}
				console.log("getPublishedQuestionsListAnswered("+userName+", "+classID+"): "+answeredQuestions);
				callback(answeredQuestions);
			}
		});
	});
}

// looks for the question with that ID and
// returns a json object with all the question stuff in it
exports.getQuestionInfo = function(questionID, callback){
	database.Questions.findOne({'_id':questionID})
	.exec(function(err, questionData){
		if(err){console.log(err)}else{
			console.log("getQuestionInfo("+questionID+"): "+questionData);
			callback(questionData);
		}
	});
}
/*
exports.getAllQuestionsText = function(classID){
	var questionsText = [];
	var data = [];
	var Classes = mongoose.model('Classes');
	Classes.find({'_id':classID}, function(err, data){
		if(err){console.log(err)}else{
			console.log(data);
			var questionIds = data[0].questionIds;
			var Questions = mongoose.model('Questions');
			var className = [];
			for(var i=0; i < userClasses.length; i++){
				Classes.find({'_id':userClasses[i]._id}, function(err, classesName) {
					if(err){console.log(err)}else{
						console.log(classesName);
						classesNames.add(classesName[0]);
					}
				})
			}
			callback("", classesNames);
		}
	});
}
*/
// saves the data that a student has answered the question
// returns true if successful, false otherwise
exports.submitStudentAnswer = function(userName, classID, questionID, answer){
	var studentAnswerData = {
		studentName: userName,
		classID: classID,
		questionId: questionID,
		answer: answer
	};
	var newAnswer = new database.StudentAnswers(studentAnswerData);
	newAnswer.save(function(err, data){
		if(err){console.log(err)}else{
			console.log("submitStudentAnswer("+userName+", "+classID+", "+questionID+"): successful");
		}
	});
}

exports.getStudentAnswer = function(userName, questionID, callback){
	database.StudentAnswers.findOne({studentName:userName, questionId:question._id})
	.exec(function(err, studentAnswer){
		if(err){console.log(err)}else{
			console.log("getStudentAnswer("+userName+", "+classID+", "+questionID+"): "+ studentAnswer.answer);				
			callback(studentAnswer.answer);
		}
	});
}