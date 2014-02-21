var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var classIDSchema = new Schema({
	name: String,
	idNumber: Number
}, {collection: 'classIDSchema'})
exports.ClassID = mongoose.model('ClassID', classIDSchema);

var userSchema = new Schema({
	name:  String,
	pwd: String,
	type: String,
	classesIDArray: [{type: Number, ref: 'Classes'}]
}, {collection: 'userSchema'});
exports.Users = mongoose.model('Users', userSchema);

var classesSchema = new Schema({
	_id: Number,
	name: String,
	questionIDs: [{type: Schema.ObjectId, ref: 'Questions'}],
	userNames: [String]
}, {collection: 'classesSchema'});
exports.Classes = mongoose.model('Classes', classesSchema);

var questionsSchema = new Schema({
	classID: {type: Number, ref: 'Classes'},
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

var studentAnswers = new Schema({
	studentName: String,
	classID: Number,
	questionID: String,
	answer: String
}, {collection: 'studentAnswers'});
exports.StudentAnswers = mongoose.model('StudentAnswers', studentAnswers);
