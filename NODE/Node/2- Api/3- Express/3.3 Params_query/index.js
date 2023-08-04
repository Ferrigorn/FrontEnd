// Requerir express

const express = require("express");

// Variable para crear el puerto

const PORT = 8080;

// Crear el servidor 

const app = express();

// Routing con param y query 

const router = express.Router();

// Params

router.get("/buscar/:name", (req, res, next) =>{
    const { name } = req.params;
    const alumns = ["Ferriol", "Guille", "Maria", "Marta", "Rafa"];
    let acc = 0;
    alumns.forEach((element) => element.toLocaleLowerCase() === name.toLocaleLowerCase())
})