exports.view = function(req, res){
	res.render('questionResponse', {
		'class': 'Biology',
	     'question': 'hello?'
  	});
}