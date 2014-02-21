/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  IMPORTANT: You should make sure the

      local_database_name

  variable matches its value in app.js  Otherwise, you'll have
  initialized the wrong database.
*/

var mongoose = require('mongoose');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'test';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);


// Do the initialization here
var database = require('./routes/database');
var dbConnection = require('./routes/dbConnection');

// Step 2: Remove all existing documents
database.ClassID
  .find()
  .remove()
  .exec(function(err){
  database.Users
    .find()
    .remove()
    .exec(function(err){
    database.Classes
      .find()
      .remove()
      .exec(function(err){
      database.Questions
        .find()
        .remove()
        .exec(function(err){
        database.StudentAnswers
          .find()
          .remove()
          .exec(onceClear);              
        });    
      });    
    });    
  }); // callback to continue at

// Step 3: load the data from the JSON file
function onceClear(err) {
  if(err) console.log(err);
  dbConnection.initialize(function(err){
    if(err) console.log(err);
     // The script won't terminate until the 
    // connection to the database is closed
    mongoose.connection.close();
  });
}
