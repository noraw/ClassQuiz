var database = require('./dbConnection');

/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */
exports.view = function(req, res){
	req.session.classID = null;
	req.session.className = null; 
	database.getUsersClassesNames(req.session.userName, function(classes){
		res.render('studentHome', {
			'userName': req.session.userName,
			'createError': req.query.createError,
			'joinError': req.query.joinError,
			'classes': classes
	  	});		
	});
}


exports.enrollInClass = function(req, res){
	console.log(req.session);
	console.log(req.query);
	if(req.query.newClassName === ""){
		var error = encodeURIComponent('Please enter a class code.');
		res.redirect('/studentHome?joinError='+error);
	}else{
		database.isClass(req.query.classCode, function(isClass, classData){
			if(isClass){
				database.isAlreadyEnrolled(req.session.userName, req.query.classCode, function(isEnrolled){
					if(isEnrolled){
						var error = encodeURIComponent('You have already enrolled in that class.');
						res.redirect('/studentHome?joinError='+error);
					}else{
						database.enrollInClass(req.session.userName, req.query.classCode, function(){
							req.session.classID = classData._id;
							req.session.className = classData.name; 
							res.redirect('/studentClass');
						});
					}
				});
			}else{
				var error = encodeURIComponent('That class code is invalid.');
				res.redirect('/studentHome?joinError='+error);
			}
		});
	}
}

exports.useExistingClass = function(req, res){
	console.log(req.query);
	console.log(req.session);
	console.log(JSON.parse(req.query.classList).classID);
	var classList = JSON.parse(req.query.classList);
	if(classList.classID == 0){
		var error = encodeURIComponent('Please select a class.');
		res.redirect('/studentHome?selectError='+error);
	}else{
		req.session.classID = classList.classID;
		req.session.className = classList.className; 
		res.redirect('/studentClass');
	}
}