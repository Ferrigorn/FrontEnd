const Character = require("../models/Character.model");
const Movie = require("../models/Movie.model");

//! Post create

const createMovie = async (req, res, next) => {
  try {
    await Movie.syncIndexes();
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    if (savedMovie) {
      return res.status(200).json(savedMovie);
    } else {
      return res.status(404).json("Movie dont save");
    }
  } catch (error) {
    return next(error);
  }
};

//! Añadir y eliminar Characters

const addCharacter = async (req, res, next) => {
  try {
    let arrayCharacters;
    const { id } = req.params;
    const { characters } = req.body;

    const movieById = await Movie.findById(id);
    let updateMovie;

    if (movieById) {
      arrayCharacters = characters.split(",");
      arrayCharacters.forEach(async (element) => {
        if (movieById.characters.includes(element)) {
          console.log("✔");
          try {
            await Movie.findByIdAndUpdate(id, {
              $pull: { characters: element },
            });
            updateMovie = await Movie.findById(id);
            try {
              await Character.findByIdAndUpdate(element, {
                $pull: { movies: id },
              });

              const updateChar = await Character.findById(element);
            } catch (error) {
              return res.status(404).json(error);
            }
          } catch (error) {
            return res.status(404).json(error);
          }
        } else {
          console.log("👌");
          try {
            await Movie.findByIdAndUpdate(id, {
              $push: { characters: element },
            });
            updateMovie = await Movie.findById(id);
            try {
              await Character.findByIdAndUpdate(element, {
                $push: { movies: id },
              });

              const updateChar = await Character.findById(element);

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
          update: await Movie.findById(id).populate({
            path: "characters",
            populate: {
              path: "movies",
            },
          }),
        });
      }, 500);
      
    } else {
      return res.status(404).json("movie not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! Cambiar view (true or false)

const changeView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { view } = req.body;
    const movieById = await Movie.findById(id);
    if (movieById) {
      try {
        await movieById.updateOne({ view });
        const updateView = await Movie.findById(id);

        return res.status(200).json({
          testUpdateView: updateView.view === view ? true : false,
        });
      } catch (error) {
        return res.status(404).json("failed update view to movie");
      }
    } else {
      return res.status(404).json("movie not found");
    }
  } catch (error) {
    return next(error);
  }
};

//! Delete movie

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);

    try {
      const test = await Character.updateMany(
        { movies: id },
        { $pull: { movies: id } }
      );

      return res
        .status(200)
        .json({
          test: test.modifiedCount === test.matchedCount ? true : false,
        });
    } catch (error) {
      return res.status(404).json("error delete movie");
    }
  } catch (error) {
    return next(error)
  }
};


module.exports = { createMovie, addCharacter, changeView, deleteMovie };