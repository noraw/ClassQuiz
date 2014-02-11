var mongoose = require('mongoose');
var database = require('./database.js');

exports.isUser = function(name, callback){
	return database.usersTable.find({name: name}, {_id: 1}).limit(1)
}

exports.addUser = function(name, pwd, type){
	var userData = {
		name = name,
		pwd = pwd,
		type = type
	};
	var Users = mongoose.model('Users');
	var newUser = new Users(userData);
	newUser.save(function(err, data){
		if(err){
			console.log(err);
			return False;
		}else{
			console.log(data);
			return True;
		}
	});
}

exports.getClassesNames = function(name, callback){
	var classesNames = [];
	var userInfo = [];
	var Users = mongoose.model('Users');
	Users.find({'name':name}, function(err, userInfo){
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
	})
}
