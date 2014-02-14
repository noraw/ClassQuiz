var database = require('./dbConnection');
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){
	console.log("\n\n\npublishQuestion");
	console.log(req.body);
	database.getNewQuestionsList(req.body.classID, function(question){
		console.log(question);
		res.render('publishQuestion', {
			'className': req.body.className,
			'classID': req.body.classID,
			'userName': req.body.userName,
			'questions': [question]
	  	});
//		$("#questionList").append('<option id="'+question._id + '" value="' +question._id + '" name="' + question._id + '">' + question.text + '</option>');
	});
}


