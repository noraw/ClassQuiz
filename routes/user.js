var database = require('./dbConnection');

exports.viewNewUser = function(req, res){
	res.render('newUser', {
		'error': req.query.error
	});
}

exports.createUser = function(req, res){
	var userName = req.query.userName;
	var type = req.query.personType;
	var pwd = req.query.password;
	var pwdConfirm = req.query.passwordConfirm;
	console.log("createUser");
	console.log(req.query);

	if(pwd === pwdConfirm){
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
		res.redirect('/newUser?error='+error);
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