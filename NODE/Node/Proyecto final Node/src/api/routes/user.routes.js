const { isAuth, isAuthAdmin } = require("../../middleware/auth.middleware");
const { upload } = require("../../middleware/files.middleware");
const {
  registerSlow,
  login,
  sendPassword,
  changePassword,
  modifyPassword,
  update,
  checkNewUser,
  deleteUser,
  resendCode,
  autoLogin,
  addFavTherapy,
  addHasDisorder
} = require("../controllers/User.controller");

const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), registerSlow);

UserRoutes.post("/resend", resendCode);

UserRoutes.post("/login", login);

UserRoutes.post("/login/autologin", autoLogin);

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);

UserRoutes.patch("/update/update", [isAuth], upload.single("image"), update);

UserRoutes.patch("/addFavTherapy", [isAuth], addFavTherapy);

UserRoutes.patch("/addHasDisorder", [isAuth], addHasDisorder);

UserRoutes.delete("/:id", [isAuth], deleteUser);

UserRoutes.patch("/sendPassword/:id", sendPassword);

UserRoutes.patch("/forgotpassword/forgotpassword", changePassword);

UserRoutes.post("/check", checkNewUser);


module.exports = UserRoutes;