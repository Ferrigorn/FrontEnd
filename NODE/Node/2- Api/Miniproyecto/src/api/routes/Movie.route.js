const { upload } = require("../../middleware/files.middleware");
const { createMovie, deleteMovie, addCharacter, changeView } = require("../controllers/Movie.controller");

const express = require("express");

const MovieRoutes = express.Router();

MovieRoutes.post("/create", upload.single("image"), createMovie);
MovieRoutes.patch("/add/:id", addCharacter);
MovieRoutes.patch("/update/view/:id", changeView);
MovieRoutes.delete("/:id", deleteMovie);


module.exports = MovieRoutes;