
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('teacherClass', {
		'class': 'Biology',
		'code': '112314'
	  	});
}


