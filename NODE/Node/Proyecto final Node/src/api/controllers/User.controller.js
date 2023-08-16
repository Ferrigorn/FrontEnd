/* eslint-disable no-unused-vars */
const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const randomCode = require("../../utils/randomCode");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/User.model");
dotenv.config();
const nodemailer = require("nodemailer");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");
const Disorder = require("../models/Disorder.model");
const Therapy = require("../models/Therapy.model");
const validator = require("validator");
const setError = require("../helpers/setError");

//! Registro (SIGNIN)

const registerSlow = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    let confirmationCode = randomCode();

    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name },
    );

    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });

      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image =
          "https://res.cloudinary.com/dyyzufpto/image/upload/v1691163466/BootCamp/png-transparent-silhouette-user-person-silhouette-cdr-animals-head_vxp9iy.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          const emailEnv = process.env.EMAIL_ENV;
          const password = process.env.PASSWORD_ENV;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            } else {
              console.log("Email sent: " + info.response);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            }
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//!  Check confirmacion del code en user nuevo
const checkNewUser = async (req, res, next) => {
  try {
    const { email, confirmationCode } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(404).json("User not found");
    } else {
      if (userExists.confirmationCode === confirmationCode) {
        try {
          await userExists.updateOne({ check: true });
          const updateUser = await User.findOne({ email });

          return res
            .status(200)
            .json({ testCheckUser: updateUser.check == true ? true : false });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        await User.findByIdAndDelete(userExists._id);
        deleteImgCloudinary(userExists.image);
        return res.status(404).json({
          userExists,
          check: false,
          delete: (await User.findById(userExists._id))
            ? "error delete user"
            : "ok delete user",
        });
      }
    }
  } catch (error) {
    return next(setError(500, error.message));
  }
};

//! Resend codeconfirmation user nuevo

const resendCode = async (req, res, next) => {
  try {
    const email = process.env.EMAIL_ENV;
    const password = process.env.PASSWORD_ENV;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: email, pass: password },
    });

    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `Su codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ resend: true });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//! Login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);

        return res.status(200).json({ user: userDB, token });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! Autologin

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      if (password === userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("Password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! Cambio contraseña antes de login

const changePassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      return res.redirect(
        307,
        `http://localhost:8080/api/v1/users/sendPassword/${userDB._id}`,
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    const passwordSecure = randomPassword();

    const email = process.env.EMAIL_ENV;
    const password = process.env.PASSWORD_ENV;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: email, pass: password },
    });

    const mailOptions = {
      from: email,
      to: userDB.email,
      subject: "Nueva Con",
      text: `User: ${userDB.name}. Your new code login is ${passwordSecure}. Si usted no ha requerido el cambio de password pongase en contacto con nosotros`,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json("Dont send email and dont update user");
      } else {
        console.log("Email sent: " + info.response);
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);
        try {
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });
          const userUpdatePassword = await User.findById(id);

          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            return res
              .status(200)
              .json({ updateUser: true, sendPassword: true });
          } else {
            return res
              .status(404)
              .json({ updateUser: false, sendPassword: true });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

//! Cambio contraseña una vez logado

const modifyPassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    const validado = validator.isStrongPassword(newPassword);
    const { _id } = req.user;
    if (validado) {
      if (bcrypt.compareSync(password, req.user.password)) {
        const newPasswordHashed = bcrypt.hashSync(newPassword, 10);
        try {
          await User.findByIdAndUpdate(_id, { password: newPasswordHashed });

          const userUpdate = await User.findById(_id);

          if (bcrypt.compareSync(newPassword, userUpdate.password)) {
            return res.status(200).json({ updateUser: true });
          } else {
            return res.status(200).json({ updateUser: false });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("password not valid");
    }
  } catch (error) {
    return next(error);
  }
};

//! Update

const update = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();

    const patchUser = new User(req.body);

    if (req.file) {
      patchUser.image = catchImg;
    }
    patchUser._id = req.user._id;
    patchUser.password = req.user.password;
    patchUser.rol = req.user.rol;
    patchUser.confirmationCode = req.user.confirmationCode;
    patchUser.check = req.user.check;
    patchUser.email = req.user.email;

    try {
      await User.findByIdAndUpdate(req.user._id, patchUser);
      if (req.file) deleteImgCloudinary(req.user.image);

      const updateUser = await User.findById(req.user._id);

      const updateKeys = Object.keys(req.body);

      const testUpdate = [];
      updateKeys.forEach((item) => {
        if (updateUser[item] == req.body[item]) {
          if (updateUser[item] != req.user[item]) {
            testUpdate.push({ [item]: true });
          } else {
            testUpdate.push({ [item]: "Misma información" });
          }
        } else {
          testUpdate.push({
            [item]: false,
          });
        }
      });

      if (req.file) {
        updateUser.image == catchImg
          ? testUpdate.push({ file: true })
          : testUpdate.push({ file: false });
      }
      return res.status(200).json({ testUpdate, updateUser });
    } catch (error) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return next(error);
  }
};

//! Add Disorder Has

const addHasDisorder = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { disorders } = req.body;
    const arrayDisorders = disorders.split(",");
    arrayDisorders.forEach(async (element) => {
      if (req.user.disordersHas.includes(element)) {
        try {
          await User.findByIdAndUpdate(_id, {
            $pull: { disordersHas: element },
          });
          try {
            await Disorder.findByIdAndUpdate(element, {
              $pull: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "Error updating pull id User in disorder model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "Error updating pull disorder",
            element,
            message: error.message,
          });
        }
      } else {
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { disordersHas: element },
          });
          try {
            await Disorder.findByIdAndUpdate(element, {
              $push: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "Error updating push id User in disorder model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "Error updating push disorder",
            element,
            message: error.message,
          });
        }
      }
    });
    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("disordersHas"));
    }, 100);
  } catch (error) {
    return next(error);
  }
};

//! Add Fav Therapies

const addFavTherapy = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { therapies } = req.body;
    const arrayTherapy = therapies.split(",");
    arrayTherapy.forEach(async (element) => {
      if (req.user.therapiesFav.includes(element)) {
        try {
          await User.findByIdAndUpdate(_id, {
            $pull: { therapiesFav: element },
          });
          try {
            await Therapy.findByIdAndUpdate(element, {
              $pull: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "Error updating pull id User in Therapy model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "Error updating pull therapy",
            element,
            message: error.message,
          });
        }
      } else {
        try {
          await User.findByIdAndUpdate(_id, {
            $push: { therapiesFav: element },
          });
          try {
            await Therapy.findByIdAndUpdate(element, {
              $push: { userFav: _id },
            });
          } catch (error) {
            return res.status(404).json({
              error: "Error updating push id User in therapy model",
              message: error.message,
            });
          }
        } catch (error) {
          return res.status(404).json({
            error: "Error updating push therapy",
            element,
            message: error.message,
          });
        }
      }
    });
    setTimeout(async () => {
      return res
        .status(200)
        .json(await User.findById(_id).populate("therapiesFav"));
    }, 100);
  } catch (error) {
    return next(error);
  }
};

// Que usuarios tienen mas o menos desordenes

const numbDisorders = async (req, res, next) => {
  try {
    const userMoreDisorder = await User.find();
    userMoreDisorder.sort(
      (a, b) => b.disordersHas.length - a.disordersHas.length,
    );
    return res.status(200).json(userMoreDisorder);
  } catch (error) {
    return res.status(404).json("Error encntrando disorders de user");
  }
};

// Que terapias son las mas elegidas por los usuarios

const therapies5Fav = async (req, res, next) => {
  try {
    const favTherapyOrdened = await User.find();
    favTherapyOrdened.sort(
      (a, b) => b.therapiesFav.length - a.therapiesFav.length,
    );
    const top5Terapies = favTherapyOrdened.slice(0, 5);
    return res.status(200).json(top5Terapies);
  } catch (error) {
    return res.status(404).json("Error adquiriendo top3 terapias");
  }
};

//! Delete user

const deleteUser = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { _id, image } = req.user;
    await User.findByIdAndDelete(_id);
    try {
      await Therapy.updateMany({ userFav: _id }, { $pull: { userFav: _id } });
      try {
        Disorder.updateMany({ userFav: _id }, { $pull: { userFav: _id } });
        return res
          .status(404)
          .json({ testDeleteOk: (await User.findById(_id)) ? false : true });
      } catch (error) {
        return res
          .status(404)
          .json("Error deleting in Disorder model", error.message);
      }
    } catch (error) {
      return res.status(404).json("Error deleting in Therapy", error.message);
    }
    // if (await User.findById(_id)) {
    //   return res.status(404).json("Dont delete");
    // } else {
    //   deleteImgCloudinary(image);
    //   return res.status(200).json("ok delete");
    // }
  } catch (error) {
    return next(error);
  }
};

//! Exportamos para usar en las rutas

module.exports = {
  registerSlow,
  checkNewUser,
  deleteUser,
  update,
  modifyPassword,
  changePassword,
  sendPassword,
  autoLogin,
  login,
  resendCode,
  addFavTherapy,
  addHasDisorder,
  numbDisorders,
  therapies5Fav,
};
