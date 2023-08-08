const mongoose = require("mongoose");

const TherapySchema = new mongoose.Schema(
    {
        name: {type: String, unique: true, require: true},

        disorders: [{type: mongoose.Schema.Types.ObjectId, ref: "Disorder"}],
    },
    {
        timestamps: true,
    }
);

const Therapy = mongoose.model("Therapy", TherapySchema);

module.exports = Therapy;