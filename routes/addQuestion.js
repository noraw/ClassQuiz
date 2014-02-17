var database = require('./dbConnection');

exports.view = function(req, res){
	console.log("addQuestion");
	console.log(req.body);
	res.render('addQuestion', {
		'className': req.session.className,
		'error': req.query.error
  	});
}

exports.createQuestion = function(req, res){
	console.log(req.query);
	if(req.query.questionText === "" || req.query.aText === "" || req.query.bText === ""){
		var error = encodeURIComponent('Please fill in the question text, and the text for answer A and B.');
		res.redirect('/addQuestion?error='+error);
	}else if(req.query.cText === "" && req.query.dText != ""){
		var error = encodeURIComponent('Please if you have an answer D you must have an answer C.');
		res.redirect('/addQuestion?error='+error);
	}else if(req.query.correctAnswer === "-"){
		var error = encodeURIComponent('Please select which answer is correct.');
		res.redirect('/addQuestion?error='+error);
	}else {
		var data = req.query;
		database.addQuestion(req.session.classID, data.questionText, data.aText, data.bText, data.cText, data.dText, data.dText);
		res.redirect('/teacherClass');
	}
}