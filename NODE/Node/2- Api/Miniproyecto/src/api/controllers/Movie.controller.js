const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Movie = require("../models/Movie.model");

const createMovie = async (req, res, next) => {
  let catchImage = req.file?.path;
  console.log(catchImage)
  
  try {
    await Movie.syncIndexes();
    const newMovie = new Movie(req.body);

    if (req.file) {
      newMovie.image = catchImage;
    } else {
      newMovie.image =
        "https://res.cloudinary.com/dhkbe6djz/image/upload/v1689099748/UserFTProyect/tntqqfidpsmcmqdhuevb.png";
    }

    const savedMovie = await newMovie.save();
    console.log(savedMovie)
    if (savedMovie) {
      return res.status(200).json(savedMovie);
    } else {
      return res.status(404).json("Error al guardar movie en la base de datos");
    }
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImage);
     next(error);
     return res.status(404).json(error.message)
  }
};

module.exports = { createMovie };
