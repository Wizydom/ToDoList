require('dotenv').config()
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
connection.connect();
 

 try {
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        console.log("connexion réussie");
      });
 } catch (error) {
    console.log(error)
 }
connection.end();