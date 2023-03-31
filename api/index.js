import express from "express";
import userRouter from './routes/user.js'
// Initialisation de l'app
var app = express();
app.use(express.json());//pour recevoir des requetes en Json
const port = 5000//déclaration du port du serveur 
app.listen(port,  () => {// Rhozales a dit: "mets toi en ecoute sur ce port là" et si c'est bon affiche le message
    console.log("Serveur Express connecté sur le port " + port)
})

// route index
app.get('/', function (req, res) {//route de la page principale une fois la connection établie
    res.send('Bienvenue sur Task.com');
});
app.use('/task/v1',userRouter)//ça c'est ce qui s'affichera lorsqu'un utilisateur cliquera sur notre lien  + la reference donné dans router de user