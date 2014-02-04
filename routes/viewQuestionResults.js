
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('viewQuestionResults', {
		'question': 'What are you doing?',
	    'answers': [
	      { 'answerText': 'sdlkfjsl' }
		    ]  
  	});
}


