const Therapy = require("../models/Therapy.model");


//Create Therapy

const createTherapy = async (req, res, next) => {
    try {
        await Therapy.syncIndexes();
        const newTherapy = new Therapy(req.body);
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

module.exports = createTherapy;