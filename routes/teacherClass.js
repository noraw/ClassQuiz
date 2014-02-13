
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('teacherClass', {
		'class': req.query.newClass,
		'code': req.query.classID
	  	});
}


