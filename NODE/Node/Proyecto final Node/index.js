const express = require("express")
const dotenv = require("dotenv");
dotenv.config();

const { connect } = require("./src/utils/database");

connect();

const { configCloudinary } = require("./src/middleware/files.middleware");

configCloudinary();


const PORT = process.env.PORT;

const app = express();

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({limit: "5mb", extended: false}));

//Rutas


// Escuchar al servidor en el puerto
app.listen(PORT, ()=> {
    console.log(`Servidor escuchado en el puerto ${PORT}, en http://localhost:${PORT}`);
});