var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
	var userSchema = new Schema({
	  name:  String,
	  pwd: String,
	  type: String,
	  classesIDArray: [{type: Schema.ObjectId, ref: 'Classes'}]
	}, {collection: 'userSchema'});
	module.exports = mongoose.model('Users', userSchema);
	module.exports = db.usersTable('Users', userSchema);

	var classesSchema = new Schema({
		name: String,
		questionIds: [{type: Schema.ObjectId, ref: 'Questions'}]
	}, {collection: 'classesSchema'});
	module.exports = mongoose.model('Classes', classesSchema);
	module.exports = db.classesTable('Classes', classesSchema);

	var questionsSchema = new Schema({
		classId: {type: Schema.ObjectId, ref: 'Classes'},
		text: String,
		answerA: String,
		answerB: String,
		answerC: String,
		answerD: String,
		correctAnswer: String,
		date: Date,
		isPublished: Boolean
	}, {collection: 'questionsSchema'});
	module.exports = mongoose.model('Questions', questionsSchema);
	module.exports = db.questionsTable('Questions', questionsSchema);

	var studentAnswers = new Schema({
		studentName: String,
		questionId: String,
		answer: String
	}, {collection: 'studentAnswers'});
	module.exports = mongoose.model('StudentAnswers', studentAnswers);
	module.exports = db.studentAnswersTable('StudentAnswers', studentAnswers);
});


mongoose.connect( 'mongodb://localhost/quiz' );
