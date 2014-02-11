var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  pwd: String,
  type: String
  classesIDArray: [String]
}, {collection: 'userSchema'});
mongoose.model('Users', userSchema);
//module.exports = db.usersTable('Users', userSchema);

var classesSchema = new Schema({
	name: String,
	id: String,
	questionIds: [Number]
}, {collection: 'classesSchema'});
mongoose.model('Classes', classesSchema);
//module.exports = db.classesTable('Classes', classesSchema);

var questionsSchema = new Schema({
	classId: String,
	id: String
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
	studentName = String,
	questionId = String,
	answer = String
}, {collection: 'studentAnswers'});
mongoose.model('StudentAnswers', studentAnswers);
//module.exports = db.studentAnswersTable('StudentAnswers', studentAnswers);



mongoose.connect( 'mongodb://localhost/quiz' );
