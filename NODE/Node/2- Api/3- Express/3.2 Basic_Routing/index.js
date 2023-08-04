// Requerir express

const express = require("express");

// Variable para crear el puerto

const PORT = 8080;

// Crear el servidor

const app = express();

// Crear la ruta

const router = express.Router();

router.get("/inicio", (req, res, next) => {
    res.send("<h1>Hello world</h1>")
});

router.get("/movies", (req, res, next) =>{
    const movies = ["Star Trek", "El señor de los anillos", "La ola"];
    res.send(movies);
});

app.use("/api/v1", router);

// "Escuchar" en el puerto al servidor
app.listen(PORT, ()=>{
    console.log(`Server is listening in port http://localhost:${PORT}`);
})