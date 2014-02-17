


exports.view = function(req, res){
	res.render('welcomePage', {
		'error': req.query.error,
	});
}

