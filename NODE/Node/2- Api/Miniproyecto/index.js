// Requerir express, dotenv, cloudinary y connect

const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { connect } = require("./src/utils/BaDa");

connect();

const { configCloudinary } = require("./src/middleware/files.middleware");
configCloudinary();

// Creamos el puerto
const PORT = process.env.PORT;
//Crear el servidor
const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//Rutas
const CharacterRoutes = require("./src/api/routes/Character.route");
app.use("/api/v1/character", CharacterRoutes)


const MovieRoutes = require("./src/api/routes/Movie.route");
app.use("/api/v1/movie", MovieRoutes)

app.use("*", (req, res, next) =>{
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error) 
});

app.use((error, req, res) =>{
    return res
    .status(error.status || 500)
    .json(error.message || "Error inesperado")
});

app.disable("x-powered-by");

app.listen(PORT, () => {
    console.log(`Servidor escuchado en el puerto ${PORT}, en http://localhost:${PORT}`)
});