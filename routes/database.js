var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  name:  String,
  pwd: String,
  type: String,
  classesIDArray: [{type: Schema.ObjectId, ref: 'Classes'}]
}, {collection: 'userSchema'});
exports.Users = mongoose.model('Users', userSchema);
//module.exports = db.usersTable('Users', userSchema);

var classesSchema = new Schema({
	name: String,
	questionIDs: [{type: Schema.ObjectId, ref: 'Questions'}]
}, {collection: 'classesSchema'});
exports.Classes = mongoose.model('Classes', classesSchema);
//module.exports = db.classesTable('Classes', classesSchema);

var questionsSchema = new Schema({
	classID: {type: Schema.ObjectId, ref: 'Classes'},
	text: String,
	answerA: String,
	answerB: String,
	answerC: String,
	answerD: String,
	correctAnswer: String,
	date: Date,
	isPublished: Boolean
}, {collection: 'questionsSchema'});
exports.Questions = mongoose.model('Questions', questionsSchema);
//module.exports = db.questionsTable('Questions', questionsSchema);

var studentAnswers = new Schema({
	studentName: String,
	classID: String,
	questionID: String,
	answer: String
}, {collection: 'studentAnswers'});
exports.StudentAnswers = mongoose.model('StudentAnswers', studentAnswers);
//module.exports = db.studentAnswersTable('StudentAnswers', studentAnswers);



//mongoose.connect( 'mongodb://localhost/testing' );
