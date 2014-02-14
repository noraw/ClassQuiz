
var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	var userName = req.params.userName;
	database.getUsersClassesNames(userName, function(classes){
		res.render('teacherHome', {
			'username': userName,
		    'classes': classes
	  	});

	});

}
exports.chooseFunction = function(req, res){
	console.log(req.body);
	console.log(req.route);
	if(req.body.func === 'createClass'){
		createClass(req.body, req.route.callbacks[0]);
	}
}



