var database = require('./dbConnection');

exports.view = function(req, res){
	console.log("newUser");
	database.addUser('TestNName', 'test', 'student');
	database.isUser('TestNme', 'test');
	res.render('newUser', {});
}