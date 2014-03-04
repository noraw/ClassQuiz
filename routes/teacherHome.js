var database = require('./dbConnection');


exports.view = function(req, res){
	database.testT = false;
	req.session.classID = null;
	req.session.className = null; 
	database.getUsersClassesNames(req.session.userName, function(classes){
		res.render('teacherHome', {
			'userName': req.session.userName,
			'createError': req.query.createError,
			'selectError': req.query.selectError,
			'removeError': req.query.removeError,
			'classes': classes,
			'testT': false
	  	});		
	});
}

exports.viewAlternate = function(req, res){
	database.testT = true;
	req.session.classID = null;
	req.session.className = null; 
	database.getUsersClassesNames(req.session.userName, function(classes){
		res.render('teacherHome', {
			'userName': req.session.userName,
			'createError': req.query.createError,
			'selectError': req.query.selectError,
			'removeError': req.query.removeError,
			'classes': classes,
			'testT': true
	  	});		
	});
}

exports.createClass = function(req, res){
	console.log(req);
	console.log(req.session);
	if(req.query.newClassName === ""){
		var error = encodeURIComponent('Please enter a class name.');
		res.redirect('/teacherHome?createError='+error);
	}else{
		database.createClass(req.session.userName, req.query.newClassName, 
			function(classData){
			req.session.classID = classData._id;
			req.session.className = classData.name; 
			res.redirect('/teacherClass');
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
		res.redirect('/teacherHome?selectError='+error);
	}else{
		req.session.classID = classList.classID;
		req.session.className = classList.className; 
		res.redirect('/teacherClass');
	}
}