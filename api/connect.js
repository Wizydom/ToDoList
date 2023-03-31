import dotenv from "dotenv";
import mysql from 'mysql'
dotenv.config();

export const connectToDb=  ()=>{
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  })
  return  connection
}
