var mongoose = require('mongoose');
var database = require('./database.js');

exports.isUsername = function(name){
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.find({'name':name}, function(err, userInfo){
		if(err){console.log(err)}else{
			if(userInfo.length == 0){
				return false;
			}else{
				return true;
			}
		}
	});
}

exports.isUser = function(name, pwd){
	console.log("Checking if "+ name + ", " + pwd + " is a user.")
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.findOne({'name':name, 'pwd':pwd}, function(err, userInfo){
		if(err){console.log("isUser Error: " + err)}else{
			if(userInfo == null){
				return false;
			}else{
				return true;
			}
		}
	});
}

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
		if(err){
			console.log(err);
			return false;
		}else{
			console.log(data);
			return true;
		}
	});
}



exports.getUsersClassesNames = function(userName, callback){
	var classesNames = [];
	var Users = mongoose.model('Users');
	Users.find({'name':userName})
	.populate('classesIDArray.name')
	.run(function(err, classesNames){
		if(err){console.log(err)}else{
			return classesNames;
		}
	});
	/*
	var classesNames = [];
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.find({'name':userName}, function(err, userInfo){
		if(err){console.log(err)}else{
			console.log(userInfo);
			var userClasses = userInfo[0].classesIDArray;
			var Classes = mongoose.model('Classes');
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
	*/
}
/*
exports.addClass = function(className){
	var classData = {
		name = className
	};
	var Classes = mongoose.model('Classes');
	var newClass = new Classes(classData);
	newClass.save(function(err, data){
		if(err){
			console.log(err);
			return False;
		}else{
			console.log(data);
			return data._id;
		}
	});
}

exports.addQuestion = function(classID, questionText, answerA, answerB, answerC, answerD, correctAnswer){
	var questionData = {
		classId: classID,
		text: questionText,
		answerA: answerA,
		answerB: answerB,
		answerC: answerC,
		answerD: answerD,
		correctAnswer: correctAnswer,
		isPublished: False
	}
	var Questions = mongoose.model('Questions');
	var newQuestion = new Questions(questionData);
	newQuestion.save(function(err, data){
		if(err){
			console.log(err);
			return False;
		}else{
			console.log(data);
			return True;
		}
	});
	// still need to update quiz to point to question
}

exports.publishQuestion = function(questionID){
	return True;
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