const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User.model");
dotenv.config();
const nodemailer = require("nodemailer");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");


// incluir esto para actualizar los index por si acaso hemos modificado los unique
await User.syncIndexes();

