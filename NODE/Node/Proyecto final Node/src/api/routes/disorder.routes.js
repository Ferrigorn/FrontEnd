const { upload } = require("../../middleware/files.middleware");
const {
  createDisorder,
  getAll,
  getById,
  getByName,
  changeChronic,
  updateDisorder,
  deleteDisorder,
  erroresSolve,
  addTherapy,
  disorderMasPosTer,
  disordersMuchPopular,
} = require("../controllers/Disorder.controller");
const express = require("express");

const DisorderRoutes = express.Router();

DisorderRoutes.post("/create", createDisorder);
DisorderRoutes.get("/getall", getAll );
DisorderRoutes.get("/getbyid/:id", getById);
DisorderRoutes.get("/getbyname/name", getByName);
DisorderRoutes.patch("/add/:id", addTherapy)
DisorderRoutes.patch("/change/chronic/:id", changeChronic);
DisorderRoutes.patch("/update/:id", upload.single("image", updateDisorder));
DisorderRoutes.delete("/delete/:id", deleteDisorder);
DisorderRoutes.patch("error/:id", erroresSolve);
DisorderRoutes.get("/disordersmast", disorderMasPosTer);
DisorderRoutes.get("/disordersusers", disordersMuchPopular)

module.exports = DisorderRoutes;
