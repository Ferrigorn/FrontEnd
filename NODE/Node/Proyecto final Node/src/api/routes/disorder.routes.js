const createDisorder = require("../controllers/Disorder.controller");
const express = require("express");

const DisorderRoutes = express.Router();

DisorderRoutes.post("/create", createDisorder);

module.exports = DisorderRoutes;