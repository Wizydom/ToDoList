import dotenv from "dotenv";
import mysql from 'mysql'
dotenv.config();
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})
export const connectToDb=  ()=>{
  return connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    } else {
      console.log("Connexion a mysql reussie")
    }
  })
}
export const closeConnection = ()=>{
  return connection.end(()=>console.log("Deconnexion reussie"))
}