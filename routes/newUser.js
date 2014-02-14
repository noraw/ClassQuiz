var database = require('./dbConnection');

exports.view = function(req, res){
	console.log("newUser");
	//database.addUser('test1', 'test', 'student');
	//database.addUser('test4', 'test', 'student');
	//database.createClass('test4', 'TestClass5');
	//database.enrollInClass('test1', '52fad2e22d9af5a506d82f3e');

	//database.addQuestion('52fad2e22d9af5a506d82f3e', 'question1', 'a','b','c','d','c');
	//database.publishQuestion('52fbd4c49f2af4d7066a0614');
	//database.submitStudentAnswer('test2', '52fbd4c49f2af4d7066a0614', 'a');
	/*
	database.getPublishedQuestionsListAnswered('test2', '52fad2e22d9af5a506d82f3e', function(question){
		console.log("answered question: ");
		console.log(question);
	});
	/*
	database.getNewQuestionsList('52fad2e22d9af5a506d82f3e', function(questions){
		console.log("new questions: ");
		console.log(questions);
	})
	database.getPublishedQuestionsList('52fad2e22d9af5a506d82f3e', function(questions){
		console.log("published questions: ");
		console.log(questions);
	})

	database.isUser('test1', 'test', function(isuser){
		if(isuser){
			console.log("We found a user");
		}
	});
	*/
	//console.log(database.isUser('TestName', 'test'));
	

	//database.addUser(username, password, personType);
	//var userName = req.params.userName;
	res.render('newUser', {});
}