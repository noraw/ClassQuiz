
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('viewClassResults', {
		'class': 'Biology',
	    'questions': [
	      { 'questionText': 'hello?' }
		    ]  
  	});
}


