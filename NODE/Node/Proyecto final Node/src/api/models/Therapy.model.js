const mongoose = require("mongoose");

const TherapySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    duration: { type: Number, require: true },
    price: { type: Number },
    tipos: { type: String, enum: ["manual", "material", "ambas"] },
    image: { type: String },
    disorders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disorder" }],
    userFav: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Therapy = mongoose.model("Therapy", TherapySchema);

module.exports = Therapy;
