var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */
var pType;
exports.view = function(req, res){
	res.render('teacherHome', {
		'userName': req.session.userName
	  	});
}


