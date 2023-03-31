import express from "express";
import userRouter from './routes/user.js'
// Initialisation de l'app
var app = express();
app.use(express.json());
const port = 5000
app.listen(port,  () => {
    console.log("Serveur Express connecté sur le port " + port)
})

// route index
app.get('/', function (req, res) {
    res.send('Bienvenue sur Task.com');
});
app.use('/task/v1',userRouter)