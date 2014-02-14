var mongoose = require('mongoose');
var database = require('./database.js');

// takes in the username and password and 
// returns true if the user exists and false otherwise
exports.isUser = function(name, pwd, callback){
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.findOne({'name':name, 'pwd':pwd}, function(err, userInfo){
		if(err){console.log(err)}else{
			if(userInfo == null){
				console.log("isUser(" +name+ "): false");
				callback(false);
			}else{
				console.log("isUser(" +name+ "): true");
				callback(true);
			}
		}
	});
}

// Checks to see if the username is already taken by someone else
// return true if taken, false if free
exports.isUsername = function(name, callback){
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.find({'name':name}, function(err, userInfo){
		if(err){console.log(err)}else{
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
exports.addUser = function(name, pwd, type, res, callback){
	var userData = {
		name: name,
		pwd: pwd,
		type: type
	};
	console.log(userData);
	var Users = mongoose.model('Users');
	var newUser = new Users(userData);
	newUser.save(function(err, data){
		if(err){console.log(err)}else{
			console.log("addUser: successful");
			callback(res);
		}
	});
}

// creates a new class and sets the teacher as enrolled in that class
// returns the classId
exports.createClass = function(userName, className, res, callback){
	var classData = {
		name: className
	};
	var Classes = mongoose.model('Classes');
	var newClass = new Classes(classData);
	newClass.save(function(err, data){
		if(err){console.log(err)}else{
			var Users = mongoose.model('Users');
			Users.findOne({'name':userName}, function(err, user){
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
	var Users = mongoose.model('Users');
	var Classes = mongoose.model('Classes');
	Users.findOne({'name':userName}, function(err, user){
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
	var Users = mongoose.model('Users');
	Users.findOne({'name':userName})
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
		classId: classID,
		text: questionText,
		answerA: answerA,
		answerB: answerB,
		answerC: answerC,
		answerD: answerD,
		correctAnswer: correctAnswer,
		//date: new Date(),
		isPublished: false
	}
	var Questions = mongoose.model('Questions');
	var newQuestion = new Questions(questionData);
	newQuestion.save(function(err, data){
		if(err){console.log(err)}
	});
	// still need to update quiz to point to question
	var Classes = mongoose.model('Classes');
	Classes.findOne({'_id':classID}, function(err, classData){
		if(err){console.log(err)}else{
			classData.questionIds.push(newQuestion);
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
	var Questions = mongoose.model('Questions');
	Questions.findOne({'_id':questionID}, function(err, questionData){
		if(err){console.log(err)}else{
			questionData.update({'isPublished':true}, function(err){
				if(err){console.log(err)}
			});
		}
	});
}

// gets all the unpublished questions in a class
// calls the callback function each time for a found question
exports.getNewQuestionsList = function(classID, callback){
	var Classes = mongoose.model('Classes');
	var Questions = mongoose.model('Questions');
	Classes.findOne({'_id':classID})
	.populate('questionIds')
	.exec(function(err, classData){
		if(err){console.log(err)}else{
			classData.questionIds.forEach(function(question){
				Questions.findOne({'_id':question._id, 'isPublished':false})
				.exec(function(err, questionFound){
					if(questionFound != null){
						console.log("getNewQuestionsList("+classID+"): "+questionFound);
						callback(questionFound);
					}
				});
			});
		}
	});
}

// gets all the published questions in a class
// returns a list of classNames and classIDs
var getPublishedQuestionsListPrivate = function(classID, callback){
	var Classes = mongoose.model('Classes');
	var Questions = mongoose.model('Questions');
	Classes.findOne({'_id':classID})
	.populate('questionIds')
	.exec(function(err, classData){
		if(err){console.log(err)}else{
			if(classData != null){
				classData.questionIds.forEach(function(question){
					Questions.findOne({'_id':question._id, 'isPublished':true})
					.exec(function(err, questionFound){
						if(err){console.log(err)}else{
							if(questionFound != null){
								console.log("getPublishedQuestionsList("+classID+"): "+questionFound);
								callback(questionFound);
							}
						}
					});
				});
			}
		}
	});
}
exports.getPublishedQuestionsList = getPublishedQuestionsListPrivate;

// gets all the published questions in a class that the student has not answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListUnanswered = function(userName, classID, callback){
	getPublishedQuestionsListPrivate(classID, function(question){
		var StudentAnswers = mongoose.model("StudentAnswers");
		StudentAnswers.findOne({studentName:userName, questionId:question._id})
		.exec(function(err, studentAnswer){
			if(err){console.log(err)}else{
				if(studentAnswer != null){
					callback(question);
				}
			}
		});
	});
}

// gets all the published questions in a class that the student has answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListAnswered = function(userName, classID, callback){
	getPublishedQuestionsListPrivate(classID, function(question){
		var StudentAnswers = mongoose.model("StudentAnswers");
		StudentAnswers.findOne({studentName:userName, questionId:question._id})
		.exec(function(err, studentAnswer){
			if(err){console.log(err)}else{
				if(studentAnswer != null){
					callback(question);
				}
			}
		});
	});
}
/*
// looks for the question with that ID and
// returns a json object with all the question stuff in it
exports.getQuestionInfo = function(questionID){
	return {};
}

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
// returns true if successdul, false otherwise
exports.submitStudentAnswer = function(userName, questionID, answer){
	var studentAnswerData = {
		studentName: userName,
		questionId: questionID,
		answer: answer
	};
	var StudentAnswers = mongoose.model('StudentAnswers');
	var newAnswer = new StudentAnswers(studentAnswerData);
	newAnswer.save(function(err, data){
		if(err){console.log(err)}
	});
}

exports.getStudentAnswer = function(userName, questionID, callback){
	getPublishedQuestionsListPrivate(classID, function(question){
		var StudentAnswers = mongoose.model("StudentAnswers");
		StudentAnswers.findOne({studentName:userName, questionId:question._id})
		.exec(function(err, studentAnswer){
			callback(studentAnswer.answer);
		});
	});

}