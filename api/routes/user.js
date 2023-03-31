import express from "express";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import { connectToDb } from "../connect.js";
dotenv.config();

const router = express.Router();
router.post('/create', async (request, response) => {
    // Recuperation des information pour creer un user
    const pass = request.body.mot_de_passe
    // Crypage de password
    const encryptedPassord = CryptoJS.AES.encrypt(pass, process.env.CRYPTAGE).toString();
    // Définir les données à insérer
    const newUser = {
        nom: request.body.nom,
        prenom: request.body.prenom,
        email: request.body.email,
        mot_de_passe: encryptedPassord
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
    response.status(201).json({ passBefor: newUser.mot_de_passe, passAfter: encryptedPassord });
})

export default router