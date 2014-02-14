
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

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

var database = require('./routes/database');

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
app.get('/viewQuestionResults', viewQuestionResults.view);
app.get('/viewClassResults', viewClassResults.view);
app.get('/viewQuestionResultsStudent', viewQuestionResultsStudent.view);
app.get('/studentHome', studentHome.view);
app.get('/teacherHome/:userName', teacherHome.view);
app.post('/teacherHome/:func', teacherHome.chooseFunction);
app.get('/studentClass', studentClass.view);
app.get('/questionResponse', questionResponse.view);
app.get('/viewResultsStudent', viewResultsStudent.view);
app.post('/teacherClass', teacherClass.view);
app.get('/addQuestion', addQuestion.view);
app.get('/publishQuestion', publishQuestion.view);
//app.get('/', .view);
//app.get('/', .view);
//app.get('/', .view);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
