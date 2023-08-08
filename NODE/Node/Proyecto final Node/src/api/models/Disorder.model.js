const mongoose = require("mongoose");

const DisorderSchema = new mongoose.Schema(
    {
        name: {type: String, unique: true, require: true},
        chronic: {type: Boolean},
        therapies: [{type: mongoose.Schema.Types.ObjectId, ref: "Therapy"}]
    },
    {
        timestamps: true,
    }
);

const Disorder = mongoose.model("Disorder", DisorderSchema);

module.exports = Disorder;