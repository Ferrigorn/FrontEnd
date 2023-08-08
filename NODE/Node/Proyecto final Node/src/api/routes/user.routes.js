const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  registerSlow,
  login,
  sendPassword,
  modifyPassword,
  update,
  checkNewUser,
  deleteUser,
  resendCode,
  autoLogin,
} = require("../controllers/User.controller");

const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), registerSlow);

UserRoutes.post("/resend", resendCode);

UserRoutes.post("/login", login);

UserRoutes.post("/login/autologin", autoLogin);

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);

UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);

UserRoutes.delete("/", [isAuth], deleteUser);

UserRoutes.patch("/sendPassword/:id", sendPassword);

UserRoutes.post("/check", checkNewUser);


module.exports = UserRoutes;