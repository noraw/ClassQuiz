
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var mongoose = require ("mongoose"); // The reason for this demo.

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/quiz';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var database = require('./routes/database');
var welcomePage = require('./routes/welcomePage');
var newUser = require('./routes/newUser');
var viewQuestionResults = require('./routes/viewQuestionResults');
var viewClassResults = require('./routes/viewClassResults');
var viewQuestionResultsStudent = require('./routes/viewQuestionResultsStudent');
var studentHome = require('./routes/studentHome');
var teacherHome = require('./routes/teacherHome');
var studentClass = require('./routes/studentClass');
var questionResponse = require('./routes/questionResponse');
var viewResultsStudent = require('./routes/viewResultsStudent');
var teacherClass = require('./routes/teacherClass');
var addQuestion = require('./routes/addQuestion');
var publishQuestion = require('./routes/publishQuestion');


//ar project = require('./routes/project');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', welcomePage.view);
app.get('/newUser', newUser.view);
app.post('/viewQuestionResults', viewQuestionResults.view);
app.post('/viewClassResults', viewClassResults.view);
app.get('/viewQuestionResultsStudent', viewQuestionResultsStudent.view);
app.post('/studentHome', studentHome.view);
app.post('/teacherHome', teacherHome.view);
app.get('/studentClass', studentClass.view);
app.get('/questionResponse', questionResponse.view);
app.get('/viewResultsStudent', viewResultsStudent.view);
app.post('/teacherClass', teacherClass.view);
app.post('/addQuestion', addQuestion.view);
app.post('/publishQuestion', publishQuestion.view);
//app.get('/', .view);
//app.get('/', .view);
//app.get('/', .view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
