const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Disorder = require("../models/Disorder.model");
const Therapy = require("../models/Therapy.model");
const User = require("../models/User.model");

//Create Disorder

const createDisorder = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    await Disorder.syncIndexes();
    const newDisorder = new Disorder(req.body);
    if (req.file) {
      newDisorder.image = catchImage;
    } else {
      newDisorder.image =
        "https://res.cloudinary.com/dyyzufpto/image/upload/v1691679472/BootCamp/2746586_wq1p6s.png";
    }
    const savedDisorder = await newDisorder.save();
    if (savedDisorder) {
      return res.status(200).json(savedDisorder);
    } else {
      return res.status(404).json("Disorder dont save");
    }
  } catch (error) {
    return next(error);
  }
};

// Get por id

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const disorderById = await Disorder.findById(id);
    if (disorderById) {
      return res.status(200).json({ data: disorderById });
    } else {
      res.status(404).json("Disorder no encontrada");
    }
  } catch (error) {
    return next(error);
  }
};

//Get all

const getAll = async (req, res, next) => {
  try {
    const disorderAll = await Disorder.find();

    if (disorderAll.length > 0) {
      return res.status(200).json({ data: disorderAll });
    } else {
      res.status(404).json("Disorder no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

// Get por nombre

const getByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const disorderByName = await Disorder.find({ name });

    if (disorderByName.length > 0) {
      return res.status(200).json({ data: disorderByName });
    } else {
      res.status(404).json("Disorder no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

//Chronic change

const changeChronic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { chronic } = req.body;
    const disorderById = await Disorder.findById(id);
    if (disorderById) {
      try {
        await disorderById.updateOne({ chronic });
        const updateChronic = await Disorder.findById(id);
        return res.status(200).json({
          testupDateChronic: updateChronic.chronic === chronic ? true : false,
        });
      } catch (error) {
        return res.status(404).json("Chronic not update in Disorder");
      }
    } else {
      return res.status(404).json("Disorder not found");
    }
  } catch (error) {
    return next(error);
  }
};

// Update

const updateDisorder = async (req, res, next) => {
  let catchImage = req.file?.path;
  try {
    const { id } = req.params;
    const disorderById = await Disorder.findById(id);
    if (disorderById) {
      const oldImg = disorderById.image;
      const customBody = {
        _id: disorderById._id,
        image: req.file?.path ? req.file?.path : disorderById.image,
        name: req.body?.name ? req.body?.name : disorderById.name,
        tipo: req.body?.tipo ? req.body?.tipo : disorderById.tipo,
      };
      await Disorder.findByIdAndUpdate(id, customBody);
      if (req.file?.path) {
        deleteImgCloudinary(oldImg);
      }
      const updateNewDisorder = await Disorder.findById(id);
      const elementUpdate = Object.keys(req.body);
      let test = {};
      elementUpdate.forEach((item) => {
        if (req.body[item] == updateNewDisorder[item]) {
          test[item] = true;
        } else {
          test[item] = false;
        }

        if (req.file) {
          updateNewDisorder.image == req.file?.path
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
          .json({ dataTest: test, update: updateNewDisorder });
      }
    } else {
      return res.status(404).json("Disorder no encontrado");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImage);
    return next(error);
  }
};

// Add & delete Therapy

const addTherapy = async (req, res, next) => {
  try {
    let arrayTherapies;
    const { id } = req.params;
    const { therapies } = req.body;

    const disorderById = await Disorder.findById(id);

    if (disorderById) {
      arrayTherapies = therapies.split(",");
      arrayTherapies.forEach(async (element) => {
        if (disorderById.therapies.includes(element)) {
          try {
            await Disorder.findByIdAndUpdate(id, {
              $pull: { therapies: element },
            });
            await Disorder.findById(id);
            try {
              await Therapy.findByIdAndUpdate(element, {
                $pull: { disorders: id },
              });

              await Therapy.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        } else {
          try {
            await Disorder.findByIdAndUpdate(id, {
              $push: { therapies: element },
            });
            await Disorder.findById(id);
            try {
              await Therapy.findByIdAndUpdate(element, {
                $push: { disorders: id },
              });
              await Therapy.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        }
      });

      setTimeout(async () => {
        return res
          .status(200)
          .json({
            update: await Disorder.findById(id).populate({
              path: "therapies",
              populate: { path: "disorders" },
            }),
          });
      }, 500);
    } else {
      return res.status(404).json("Disorder not found");
    }
  } catch (error) {
    return next(error);
  }
};

// Delete

const deleteDisorder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const disorderDelete = await Disorder.findByIdAndDelete(id);

    try {
      const test = await Therapy.updateMany(
        { disorders: id },
        { $pull: { disordersHas: id } }
      );

      if (test.modifiedCount === test.matchedCount) {
        try {
          const testUser = await User.updateMany(
            { disordersHas: id },
            { $pull: { disordersHas: id } }
          );
          if (testUser.modifiedCount === testUser.matchedCount) {
            return res.status(200).json({
              testDeleteOK: (await Disorder.findById(id)) ? false : true,
            });
          } else {
            return res.status(404).json({
              message: "Error updating User model",
              therapies: disorderDelete.therapies,
              userFav: disorderDelete.userFav,
              idTherapyDelete: id,
            });
          }
        } catch (error) {
          return res
            .status(404)
            .json({ error: "failed updatin user", message: error.message });
        }
      } else {
        return res.status(404).json({
          message: "Error updating User model",
          therapies: disorderDelete.therapies,
          userFav: disorderDelete.userFav,
          idTherapyDelete: id,
        });
      }
    } catch (error) {
      return res.status(404).json({
        error: "Error deleting disorder",
        message: error.message,
        idDisorder: id,
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
      await Therapy.updateMany({ disorders: id }, { $pull: { disorders: id } });
      try {
        await User.updateMany(
          { disordersHas: id },
          { $pull: { disordersHas: id } }
        );
        return res.status(200).json("Error solved");
      } catch (error) {
        return res.status(404).json({ message: error.message, idDisorder: id });
      }
    } catch (error) {
      return res.status(404).json({ message: error.message, idDisorder: id });
    }
  } catch (error) {
    return next({ message: error.message, idDisorder: id });
  }
};

module.exports = {
  createDisorder,
  getAll,
  getById,
  getByName,
  addTherapy,
  changeChronic,
  updateDisorder,
  deleteDisorder,
  erroresSolve,
};
