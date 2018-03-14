'use strict'
var mysql = require('mysql');
var settings = require('./config/config.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DATABASE
});

connection.connect(function(err) {
  if ( err ) throw err
  console.log("Food fight is connected to database as " + connection.threadId)
});

module.exports = connection;