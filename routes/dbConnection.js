var mongoose = require('mongoose');
var database = require('./database.js');

exports.isUser = function(name, callback){
	return database.usersTable.find({namt: name}, {_id: 1}).limit(1)
}

exports.addUser = function(name, pwd, type, callback){
	db.
}

exports.teamlist = function teamlist(gname,callback){
4
 var Team = mongoose.model( 'Team' );
5
 Team.find({'GroupName':gname}, function (err, teams) {
6
  if(err){
7
   console.log(err);
8
  }else{
9
   console.log(teams);
10
   callback("",teams);
11
  }
12
 })// end Team.find
13
}// end exports.teamlist
