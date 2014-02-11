var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
	var userSchema = new Schema({
	  name:  String,
	  pwd: String,
	  type: String,
	  classesIDArray: [{type: Number, ref: 'Classes'}]
	}, {collection: 'userSchema'});
	mongoose.model('Users', userSchema);
	//module.exports = db.usersTable('Users', userSchema);

	var classesSchema = new Schema({
		name: String,
		_id: Number,
		questionIds: [{type: Number, ref: 'Questions'}]
	}, {collection: 'classesSchema'});
	mongoose.model('Classes', classesSchema);
	//module.exports = db.classesTable('Classes', classesSchema);

	var questionsSchema = new Schema({
		classId: {type: Number, ref: 'Classes'},
		_id: Number,
		text: String,
		answerA: String,
		answerB: String,
		answerC: String,
		answerD: String,
		correctAnswer: String,
		isPublished: Boolean
	}, {collection: 'questionsSchema'});
	mongoose.model('Questions', questionsSchema);
	//module.exports = db.questionsTable('Questions', questionsSchema);

	var studentAnswers = new Schema({
		studentName = {type: String, ref: 'Users'},
		questionId = {type: Number, ref: 'Questions'},
		answer = String
	}, {collection: 'studentAnswers'});
	mongoose.model('StudentAnswers', studentAnswers);
	//module.exports = db.studentAnswersTable('StudentAnswers', studentAnswers);
});


mongoose.connect( 'mongodb://localhost/quiz' );
