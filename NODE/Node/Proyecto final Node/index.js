const { connect } = require("./src/utils/database");
const { configCloudinary } = require("./src/middleware/files.middleware");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.BASE_URL;

connect();

const app = express();


configCloudinary();

const PORT = process.env.PORT;

const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));


app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//Rutas
const UserRoutes = require("./src/api/routes/user.routes");
const DisorderRoutes = require("./src/api/routes/disorder.routes");
const TherapyRoutes = require("./src/api/routes/therapy.routes");


app.use("/api/v1/therapies", TherapyRoutes);
app.use("/api/v1/disorders", DisorderRoutes);
app.use("/api/v1/users", UserRoutes);


app.use("*", (req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    return next(error);
})

app.use((error, req, res) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});

// Escuchar al servidor en el puerto
app.disable("x-powered-by");

app.listen(PORT, () => {
  console.log(
    `Servidor escuchado en el puerto ${PORT}, en ${BASE_URL}${PORT}`
  );
});
 