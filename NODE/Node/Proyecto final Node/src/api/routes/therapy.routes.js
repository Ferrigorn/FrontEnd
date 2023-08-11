const { upload } = require("../../middleware/files.middleware");
const {
  createTherapy,
  getAll,
  getById,
  getByName,
  updateTherapy,
  deleteTherapy,
  therapyByTipo,
  erroresSolve,
} = require("../controllers/Therapy.controller");
const express = require("express");

const TherapyRoutes = express.Router();

TherapyRoutes.post("/create", upload.single("image"), createTherapy);
TherapyRoutes.get("/:id", getById);
TherapyRoutes.get("/", getAll);
TherapyRoutes.get("/getbyname/name", getByName);
TherapyRoutes.get("/getbytipo/tipo", therapyByTipo);
TherapyRoutes.patch("/update/:id", upload.single("image"), updateTherapy);
TherapyRoutes.delete("/delete/:id", deleteTherapy);
TherapyRoutes.patch("error/:id", erroresSolve);

module.exports = TherapyRoutes;
