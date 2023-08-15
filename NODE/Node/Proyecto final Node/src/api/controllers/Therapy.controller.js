const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Disorder = require("../models/Disorder.model");
const Therapy = require("../models/Therapy.model");
const User = require("../models/User.model");

//Create Therapy

const createTherapy = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await Therapy.syncIndexes();
    const newTherapy = new Therapy(req.body);
    if (req.file) {
      newTherapy.image = catchImage;
    } else {
      newTherapy.image =
        "https://res.cloudinary.com/dyyzufpto/image/upload/v1691670708/BootCamp/png-transparent-alternative-health-services-naturopathy-medicine-staff-of-hermes-health-care-health-leaf-natural-logo_aueety.png";
    }
    const savedTherapy = await newTherapy.save();
    if (savedTherapy) {
      return res.status(200).json(savedTherapy);
    } else {
      return res.status(404).json("Therapy not saved");
    }
  } catch (error) {
    return next(error);
  }
};

// Get por id

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const therapyById = await Therapy.findById(id);
    if (therapyById) {
      return res.status(200).json({ data: therapyById });
    } else {
      res.status(404).json("Terapia no encontrada");
    }
  } catch (error) {
    return next(error);
  }
};

// Get All

const getAll = async (req, res, next) => {
  try {
    const therapyAll = await Therapy.find();

    if (therapyAll.length > 0) {
      return res.status(200).json({ data: therapyAll });
    } else {
      res.status(404).json("Terapias no encontradas");
    }
  } catch (error) {
    return next(error);
  }
};

// Get by name

const getByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const therapyByName = await Therapy.find({ name });

    if (therapyByName.length > 0) {
      return res.status(200).json({ data: therapyByName });
    } else {
      res.status(404).json("Terapia no encontrada");
    }
  } catch (error) {
    return next(error);
  }
};

// Get by tipo

// const therapyByTipo = async (req, res, next) => {
//   try {
//     const { tipos } = req.query;
//     const therapyByType = await Therapy.find({ tipos });
//     if (therapyByType.length > 0) {
//       return res.status(200).json({ data: therapyByType });
//     } else {
//       res.status(404).json("Tipo de terapia no encontrado");
//     }
//   } catch (error) {
//     return next(error);
//   }
// };

// Get by price

const therapyByPrice = async (req, res, next) => {
  try {
    const priceParam  = req.params.price;
    console.log(req.params.price)
    const therapyPrecio = await Therapy.find();
    const therapyFiltered = therapyPrecio.filter((element) => element.price <= Number(priceParam));
      return res.status(200).json(therapyFiltered)
  } catch (error) {
    return res.status(404).json("No hay terapias de ese precio")
  }
};

// Terapias con mas usuarios

const therapiesTop3 = async (req, res, next) => {
  try {
    const terapiasOrdened = await Therapy.find();
    terapiasOrdened.sort((a, b) => b.userFav.length - a.userFav.length);
    const terapiasFav3 = terapiasOrdened.slice(0, 3);
    return res.status(200).json(terapiasFav3)
  } catch (error) {
    return res.status(404).json("Error en adquirir top3")
  }
}

//Update

const updateTherapy = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    const { id } = req.params;
    const therapyById = await Therapy.findById(id);
    if (therapyById) {
      const oldImg = therapyById.image;
      const customBody = {
        _id: therapyById._id,
        image: req.file?.path ? req.file?.path : therapyById.image,
        name: req.body?.name ? req.body?.name : therapyById.name,
        tipos: req.body?.tipos ? req.body?.tipos : therapyById.tipos,
      };
      await Therapy.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(oldImg);
      }
      const updateNewTherapy = await Therapy.findById(id);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewTherapy[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }

        if (req.file) {
          updateNewTherapy.image == req.file?.path
            ? (test = { ...test, file: true })
            : (test = { ...test, file: false });
        }
      });

      let acc = 0;
      for (let clave in test) {
        if (test[clave] == false) acc++;
      }

      if (acc > 0) {
        return res.status(404).json({ dataTest: test, update: false });
      } else {
        return res
          .status(200)
          .json({ dataTest: test, update: updateNewTherapy });
      }
    } else {
      return res.status(404).json("Terapia no encontrada");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImage);
    return next(error);
  }
};

// Add & Delete Disorders

const addDisorder = async (req, res, next) => {
  try {
    let arrayDisorders;
    const { id } = req.params;
    const { disorders } = req.body;

    const therapyById = await Therapy.findById(id);

    if (therapyById) {
      arrayDisorders = disorders.split(",");
      arrayDisorders.forEach(async (element) => {
        if (therapyById.disorders.includes(element)) {
          try {
            await Therapy.findByIdAndUpdate(id, {
              $pull: { disorders: element },
            });
            await Therapy.findById(id);
            try {
              await Disorder.findByIdAndUpdate(element, {
                $pull: { therapies: id },
              });

              await Disorder.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        } else {
          try {
            await Therapy.findByIdAndUpdate(id, {
              $push: { disorders: element },
            });
            await Therapy.findById(id);
            try {
              await Disorder.findByIdAndUpdate(element, {
                $push: { therapies: id },
              });
              await Disorder.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        }
      });

      setTimeout(async () => {
        return res.status(200).json({
          update: await Therapy.findById(id).populate({
            path: "disorders",
            populate: { path: "therapies" },
          }),
        });
      }, 500);
    } else {
      return res.status(404).json("Therapy not found");
    }
  } catch (error) {
    return next(error);
  }
};

// Delete

const deleteTherapy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const therapyDelete = await Therapy.findByIdAndDelete(id);

    try {
      const test = await Disorder.updateMany(
        { therapies: id },
        { $pull: { therapiesFav: id } }
      );

      if (test.modifiedCount === test.matchedCount) {
        try {
          const testUser = await User.updateMany(
            { therapiesFav: id },
            { $pull: { therapiesFav: id } }
          );
          if (testUser.modifiedCount === testUser.matchedCount) {
            return res.status(200).json({
              testDeleteOk: (await Therapy.findById(id)) ? false : true,
            });
          } else {
            return res.status(404).json({
              message: "Error updating User model",
              disorders: therapyDelete.disorders,
              userFav: therapyDelete.userFav,
              idTherapyDelete: id,
            });
          }
        } catch (error) {
          return res
            .status(404)
            .json({ error: "failed updating users", message: error.message });
        }
      } else {
        return res.status(404).json({
          message: "Error updating User model",
          disorders: therapyDelete.disorders,
          userFav: therapyDelete.userFav,
          idTherapyDelete: id,
        });
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error deleting therapy",
        message: error.message,
        idTherapy: id,
      });
    }
  } catch (error) {
    return next(error);
  }
};

const erroresSolve = async (req, res, next) => {
  const { id } = req.params;
  try {
    try {
      await Disorder.updateMany(
        { therapies: id },
        { $pull: { therapies: id } }
      );
      try {
        await User.updateMany(
          { therapiesFav: id },
          { $pull: { therapiesFav: id } }
        );
        return res.status(200).json("Error solved");
      } catch (error) {
        return res.status(404).json({ message: error.message, idTherapy: id });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message, idTherapy: id });
    }
  } catch (error) {
    return next({ message: error.message, idTherapy: id });
  }
};

module.exports = {
  createTherapy,
  getById,
  getByName,
  getAll,
  // therapyByTipo,
  addDisorder,
  updateTherapy,
  deleteTherapy,
  erroresSolve,
  therapyByPrice,
  therapiesTop3,
};
