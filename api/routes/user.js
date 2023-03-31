import express from "express";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { connectToDb } from "../connect.js";
dotenv.config();

const router = express.Router();//creation d'une route 
/*declaration d'une méthode post de la route (elle prend en paramètre le chemin de la route cad le nom qu'on veut donner à la route et un callback
qui prend aussi deux paramètres(requete et reponse))*/
router.post('/create', async (request, response) => {//asynch c'est pour quand on va utiliser des requetes qui prennent du temps et qui doivent  s'excuter avant de continuer
    // Recuperation des information pour creer un user
    const pass = request.body.mot_de_passe
    // Crypage de password
    const encryptedPassord = CryptoJS.AES.encrypt(pass, process.env.CRYPTAGE).toString();
    // Définir les données à insérer
    const newUser = {
        nom: request.body.nom,
        prenom: request.body.prenom,
        email: request.body.email,
        pseudo:request.body.pseudo,
        mot_de_passe: encryptedPassord,
    }
    // Requête d'insertion dans la table "user"
    const query = 'INSERT INTO user SET ?';
    // connexiona la DB
   const db= connectToDb()
   db.connect()
    // Exécuter la requête avec les données à insérer
    db.query(query, newUser, (error, results, fields) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Nouvel utilisateur inséré avec succès.');
        }
      });
      const {mot_de_passe,...all}= newUser;
    response.status(201).json({ data:all });
    })
export default router