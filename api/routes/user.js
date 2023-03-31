import express from "express";
import { connectToDb, closeConnection } from "../connect.js";
const router = express.Router();$//creation d'une route 
/*declaration d'une méthode post de la route (elle prend en paramètre le chemin de la route cad le nom qu'on veut donner à la route et un callback
qui prend aussi deux paramètres(requete et reponse))*/

router.post('/create', async (request, response) => {//asynch c'est pour quand on va utiliser des requetes qui prennent du temps et qui doivent  s'excuter avant de continuer
    const name = request.body.name//la requete donne acces au body et dans le body on a acces a toutes les infos envoyées. request.body.name= name qui vient du body de la requete
    const lastName = request.body.lastName
    console.log(name + lastName)

})

export default router