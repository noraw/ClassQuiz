
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('viewQuestionResultsStudent', {
		'class': 'Biology',
		'question': 'What are you doing?',
	    'studentAnswer': 'a',
	    'correctAnswer': 'b',
  	});
}


