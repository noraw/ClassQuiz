exports.view = function(req, res){
	console.log("addQuestion");
	console.log(req.body);
	res.render('addQuestion', {
		'className': req.body.className,
		'classID': req.body.classID,
		'userName': req.body.userName
  	});
}