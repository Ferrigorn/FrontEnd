const { upload } = require("../../middleware/files.middleware");
const { createMovie } = require("../controllers/Movie.controller");

const express = require("express");

const MovieRoutes = express.Router();

MovieRoutes.post("/create", upload.single("image"), createMovie);

module.exports = MovieRoutes;