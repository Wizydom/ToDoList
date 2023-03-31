import express from "express";
import { connectToDb, closeConnection } from "../connect.js";
const router = express.Router();
router.post('/create', async (request, response) => {
    const name = request.body.name
    const lastName = request.body.lastName
    console.log(name + lastName)

})

export default router