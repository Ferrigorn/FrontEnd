const { isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  createTherapy,
  getAll,
  getById,
  getByName,
  updateTherapy,
  deleteTherapy,
  // therapyByTipo,
  erroresSolve,
  addDisorder,
  therapyByPrice,
  therapiesTop3,
} = require("../controllers/Therapy.controller");
const express = require("express");

const TherapyRoutes = express.Router();

TherapyRoutes.post("/create", upload.single("image"), createTherapy);
TherapyRoutes.get("/:id", getById);
TherapyRoutes.get("/", getAll);
TherapyRoutes.get("/getbyname/name", getByName);
// TherapyRoutes.get("/getbytipo/tipo", therapyByTipo);
TherapyRoutes.patch("/add/:id", addDisorder)
TherapyRoutes.patch("/update/:id", upload.single("image"), updateTherapy);
TherapyRoutes.delete("/delete/:id", [isAuthAdmin], deleteTherapy); 
TherapyRoutes.patch("error/:id", erroresSolve);
TherapyRoutes.get("/getbyprice/:price", therapyByPrice);
TherapyRoutes.get("/gettherapies/top3", therapiesTop3)

module.exports = TherapyRoutes;
