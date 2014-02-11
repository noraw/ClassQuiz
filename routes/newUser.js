var database = require('./dbConnection');

exports.view = function(req, res){
	console.log("newUser");
	database.addUser('TestNName', 'test', 'student');
	res.render('newUser', {});
}