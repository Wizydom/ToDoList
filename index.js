import dotenv from "dotenv";
import mysql from 'mysql'
dotenv.config();
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } else {
    console.log("Connexion reussie")
  }
});
connection.end();