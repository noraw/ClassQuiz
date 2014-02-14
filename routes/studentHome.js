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
		res.render('studentHome', {
			'username': userName,
		    'classes': classes
	  	});

	});

}
