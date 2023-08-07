const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        title: {type: String, unique: true, require: true},
        duration: {type: Number},
        characters: [{type: mongoose.Schema.Types.ObjectId, ref: "Character"}],
        view: {type: Boolean, default: false},
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model("Movie", MovieSchema)

module.exports = Movie;