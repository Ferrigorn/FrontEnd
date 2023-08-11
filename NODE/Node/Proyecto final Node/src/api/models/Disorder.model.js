const mongoose = require("mongoose");

const DisorderSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    tipo: { type: String, enum: ["Dolor", "Estres", "Enfermedad", "Estetica", "Rehabilitacion"], require: true },
    chronic: {type: Boolean},
    therapies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Therapy" }],
    userFav: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
    image: {type: String},
  },
  {
    timestamps: true,
  }
);

const Disorder = mongoose.model("Disorder", DisorderSchema);

module.exports = Disorder;
