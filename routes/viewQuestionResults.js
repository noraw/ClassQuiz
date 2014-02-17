var database = require('./dbConnection');
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\nviewQuestionResults");
	console.log(req.query);
	database.getQuestionInfo(req.query.questionList, function(data){
		res.render('viewQuestionResults', {
			'questionID': data._id,
			'questionText': data.text,
		    'aText': "a. " + data.aText,
		    'bText': "b. " + data.bText,
		    'cText': "c. " + data.cText,
		    'dText': "d. " + data.dText,
	  	});
	});
}

