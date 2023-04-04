import express from "express";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { connectToDb } from "../connect.js";
dotenv.config();

const router = express.Router();//creation d'une route 
/*declaration d'une méthode post de la route (elle prend en paramètre le chemin de la route cad le nom qu'on veut donner à la route et un callback
qui prend aussi deux paramètres(requete et reponse))*/
// CREATION UTILISATEUR
router.post('/create', async (request, response) => {//asynch c'est pour quand on va utiliser des requetes qui prennent du temps et qui doivent  s'excuter avant de continuer
  // Recuperation des informations pour creer un user
  const pass = request.body.mot_de_passe
  // Crypage de password
  const encryptedPassord = CryptoJS.AES.encrypt(pass, process.env.CRYPTAGE).toString();
  // Définir les données à insérer
  const newUser = {
    nom: request.body.nom,
    prenom: request.body.prenom,
    email: request.body.email,
    pseudo: request.body.pseudo,
    mot_de_passe: encryptedPassord,
  }
  // Requête d'insertion dans la table "user"
  const query = 'INSERT INTO user SET ?';
  // connexiona la DB
  const db = connectToDb()
  db.connect()
  // Exécuter la requête avec les données à insérer
  db.query(query, newUser, (error, results, fields) => {
    if (error) {
      console.error(error);
      response.status(500).json({ message: error.message });
    } else {
      console.log('Nouvel utilisateur inséré avec succès.');
      const { mot_de_passe, ...all } = newUser;
      response.status(201).json({ data: all });
    }
  });
  db.close()


})

//ROUTE AUTHENTIFICATION UTILISATEUR AVEC UN GET
router.get('/login', (request, response) => {
  const email = request.body.email
  const requestPassword = request.body.password
  const db = connectToDb()
  db.connect(() => console.log("Connecté"))
  const query = `SELECT * FROM user WHERE email = '${email}'`;
  db.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      response.status(401).json("Email incorrecte");
    } else {
      const encryptedPassword = results[0].mot_de_passe
      var bytes = CryptoJS.AES.decrypt(encryptedPassword, process.env.CRYPTAGE);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (decryptedPassword === requestPassword) {
        const { mot_de_passe, ...all } = results[0];
        response.status(200).json({ data: all });
      } else {
        response.status(401).json({ error: "Mot de passe incorrecte" });
      }


    }
  });

  // db.close()


})
export default router