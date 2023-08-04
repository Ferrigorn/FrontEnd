const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        title: {type: String, unique: true, require: true},
        duration: {type: Number},
        image: {type: String}
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie;