var database = require('./dbConnection');


exports.view = function(req, res){
	console.log("addQuestion");
	console.log(req.body);
	res.render('addQuestion', {
		'className': req.session.className,
		'error': req.query.error,
		'questionText': req.query.questionText,
		'aText': req.query.aText,
		'bText': req.query.bText,
		'cText': req.query.cText,
		'dText': req.query.dText
  	});
}

exports.createQuestion = function(req, res){
	console.log(req.query);
	if(req.query.questionText === "" || 
		req.query.aText === "" || 
		req.query.bText === ""){
		var error = encodeURIComponent('Please fill in the text fields.');
		res.redirect('/addQuestion?error='+error+
			"&questionText="+req.query.questionText+
			"&aText="+req.query.aText+
			"&bText="+req.query.bText+
			"&cText="+req.query.cText+
			"&dText="+req.query.dText);
	}else if(req.query.cText === "" && req.query.dText != ""){
		var error = encodeURIComponent('If you have an answer D you' +
			' must have an answer C.');
		res.redirect('/addQuestion?error='+error+
			"&questionText="+req.query.questionText+
			"&aText="+req.query.aText+
			"&bText="+req.query.bText+
			"&cText="+req.query.cText+
			"&dText="+req.query.dText);
	}else if(req.query.correctAnswer === "-"){
		var error = encodeURIComponent('Please select which answer is correct.');
		res.redirect('/addQuestion?error='+error+
			"&questionText="+req.query.questionText+
			"&aText="+req.query.aText+
			"&bText="+req.query.bText+
			"&cText="+req.query.cText+
			"&dText="+req.query.dText);
	}else {
		var data = req.query;
		var correctAnswer;
		if(data.correctAnswer === 'a'){
			correctAnswer = "a. " + data.aText;
		}else if(data.correctAnswer === 'b'){
			correctAnswer = "b. " + data.bText;
		}else if(data.correctAnswer === 'c'){
			correctAnswer = "c. " + data.cText;
		}else if(data.correctAnswer === 'd'){
			correctAnswer = "d. " + data.dText;
		}
		database.addQuestion(req.session.classID, data.questionText, 
			data.aText, data.bText, data.cText, data.dText, correctAnswer,
			function(){
			res.redirect('/teacherClass');
		});
	}
}