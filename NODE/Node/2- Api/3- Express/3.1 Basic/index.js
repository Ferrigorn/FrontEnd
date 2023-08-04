// Requerir Express

const express = require("express");

// Crear variable con el puerto

const PORT = 8080;

// Crear el servidor

const app = express();

// "Escuchar" el servidor en el puerto

app.listen(PORT, () => {
  console.log(`El servidor te escucha en http://localhost:${PORT}`);
});
