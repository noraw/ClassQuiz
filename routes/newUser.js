var database = require('./dbConnection');

exports.view = function(req, res){
	console.log("newUser");
	//database.addUser('test1', 'test', 'student');
	//database.addUser('test2', 'test', 'teacher');
	//database.createClass('test2', 'TestClass3');
	//database.enrollInClass('test1', '52fad2e22d9af5a506d82f3e');
	//database.addQuestion('52fad2e22d9af5a506d82f3e', 'question', 'a','b','c','d','c');
	database.getNewQuestionsList('52fad2e22d9af5a506d82f3e', function(questions){
		console.log("new questions: ");
		console.log(questions);
	})
	/*
	database.isUser('test1', 'test', function(isuser){
		if(isuser){
			console.log("We found a user");
		}
	});
	*/
	//console.log(database.isUser('TestName', 'test'));
	
	res.render('newUser', {});
}