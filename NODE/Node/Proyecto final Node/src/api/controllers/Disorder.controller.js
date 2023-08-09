
const Disorder = require("../models/Disorder.model");


//Create Disorder

const createDisorder = async (req, res, next) => {
    try {
        await Disorder.syncIndexes();
        const newDisorder = new Disorder(req.body);
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

module.exports = createDisorder;