var mongoose = require('mongoose');
var database = require('./database.js');

// takes in the username and password and 
// returns true if the user exists and false otherwise
exports.isUser = function(name, pwd, callback){
	console.log("Checking if "+ name + ", " + pwd + " is a user.")
	var userInfo = [];
	var Users = mongoose.model('Users');
	console.log("1");
	Users.findOne({'name':name, 'pwd':pwd}, function(err, userInfo){
		if(err){console.log("isUser Error: " + err)}else{
			console.log("isUserInfo: " + userInfo);
			if(userInfo == null){
				callback(false);
			}else{
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
				callback(false);
			}else{
				callback(true);
			}
		}
	});
}

// adds the user to the database
// returns true if successful false if failed.
exports.addUser = function(name, pwd, type){
	var userData = {
		name: name,
		pwd: pwd,
		type: type
	};
	console.log(userData);
	var Users = mongoose.model('Users');
	var newUser = new Users(userData);
	newUser.save(function(err, data){
		if(err){console.log(err)}
	});
}

// creates a new class and sets the teacher as enrolled in that class
// returns the classId
exports.createClass = function(userName, className, callback){
	var classData = {
		name: className
	};
	var Classes = mongoose.model('Classes');
	var newClass = new Classes(classData);
	newClass.save(function(err, data){
		if(err){console.log(err)}else{
			console.log(data);
			var Users = mongoose.model('Users');
			Users.findOne({'name':userName}, function(err, user){
				if(err){console.log(err)}else{
					console.log("Found User:")
					console.log(user);
					user.classesIDArray.push(newClass);
					user.save(function(err){
						if(err){console.log(err)}else{
							callback(data._id);
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
			console.log("Found User:")
			console.log(user);
			user.classesIDArray.push(classID);
			user.save(function(err){
				if(err){console.log(err)}
			});
		}
	});
}


// get all the classes that the user either teaches or is enrolled in
// returns a json with the class name and class id
exports.getUsersClassesNames = function(userName, callback){
	console.log("getUsersClassesNames:")
	var Users = mongoose.model('Users');
	Users.findOne({'name':userName})
	.populate('classesIDArray')
	.exec(function(err, user){
		if(err){console.log(err)}else{
			console.log("Names:")
			console.log(user);
			console.log(user.classesIDArray);
			callback(user.classesIDArray);
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
			console.log("Found User:")
			console.log(classData);
			classData.questionIds.push(newQuestion);
			classData.save(function(err){
				if(err){console.log(err)}
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
// returns a list of classNames and classIDs
exports.getNewQuestionsList = function(classID, callback){
	var Classes = mongoose.model('Classes');
	Classes.findOne({'_id':classID})
	.populate('questionIds')
	//.where({'questionIds.isPublished':false})
	.exec(function(err, classData){
		if(err){console.log(err)}else{
			console.log(classData);
			callback(classData.questionIds);
		}
	});
}

// gets all the published questions in a class
// returns a list of classNames and classIDs
exports.getPublishedQuestionsList = function(classID){
	return [];
}
/*
// gets all the published questions in a class that the student has not answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListUnanswered = function(userName, classID){
	return [];
}

// gets all the published questions in a class that the student has answered
// returns a list of classNames and classIDs
exports.getPublishedQuestionsListAnswered = function(userName, classID){
	return [];
}

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

// saves the data that a student has answered the question
// returns true if successdul, false otherwise
exports.submitStudentAnswer = function(userName, questionID, answer){
	return false;
}
*/