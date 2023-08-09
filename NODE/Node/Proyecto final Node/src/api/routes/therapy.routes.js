const { upload } = require("../../middleware/files.middleware");
const createTherapy = require("../controllers/Therapy.controller");
const express = require("express");

const TherapyRoutes = express.Router();

TherapyRoutes.post("/create", upload.single("image"), createTherapy);

module.exports = TherapyRoutes;