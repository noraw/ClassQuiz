
/*
 * GET home page.
 */

/*
 * Function that is called when the document is ready.
 */

exports.view = function(req, res){

	res.render('teacherHome', {
		'username': 'Nora',
	    'classes': [
	      { 'class': 'Biology' }
		    ]  
  	});
}
exports.chooseFunction = function(req, res){
	console.log(req.body);
	if(req.params.func === 'createClass'){
		createClass(req, res);
	}
}

exports.createClass = function(req, res){
	console.log(req.params);
	//console.log(res);

}

