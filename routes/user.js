var database = require('./dbConnection');

exports.viewNewUser = function(req, res){
	res.render('newUser', {
		'error': req.query.error,
		'userName': req.query.userName
	});
}

exports.createUser = function(req, res){
	var userName = req.query.userName;
	userName = userName.replace(/(^\s+|\s+$)/g,'')
	var type = req.query.personType;
	var pwd = req.query.password;
	var pwdConfirm = req.query.passwordConfirm;
	console.log("createUser");
	console.log(req.query);
	if(userName === ""){
		var error = encodeURIComponent('Please enter a username.');
		res.redirect('/newUser?error='+error);
	}else if(pwd === pwdConfirm){
		database.isUsername(userName, function(isUser){
			if(!isUser){
				database.addUser(userName, pwd, type, function(){
					req.session.userName = userName;
					if(type == 'student'){
						res.redirect('/studentHome');
					}else{
						res.redirect('/teacherHome');
					}
				});
			}else{
				var error = encodeURIComponent('That username is already taken.  Please enter a new one.');
				res.redirect('/newUser?error='+error);
			}
		});
	}else{
		var error = encodeURIComponent('Please make your passwords match.');
		res.redirect('/newUser?error='+error+"&userName="+userName);
	}
}

exports.login = function(req, res) {
	var userName = req.query.userName;
	var pwd = req.query.password;

	database.isUser(userName, pwd, function(isUser, data){
		console.log("isUser callback");
		console.log(isUser);
		console.log(data);
		if(isUser){
			req.session.userName = userName;
			if(data.type == 'student'){
				res.redirect('/studentHome');
			}else{
				res.redirect('/teacherHome');
			}
		}else{
			var error = encodeURIComponent('Please enter a vaild username and password.');
			res.redirect('/?error='+error);
		}
	});
}

exports.logout = function(req, res) {
  req.session.userName = null;
  res.redirect('/');
}

exports.removeClass = function(req, res){
	console.log(req.query);
	var classList = JSON.parse(req.query.classList);
	if(classList.classID == 0){
		var error = encodeURIComponent('Please select a class.');
		res.redirect('/'+req.query.prevPage+'?removeError='+error);
	}else{
		database.removeClass(req.session.userName, classList.classID, function(){
			var error = encodeURIComponent("You have removed '"+ classList.className +"'.");
			res.redirect('/'+req.query.prevPage+'?removeError='+error);
		});
	}
}