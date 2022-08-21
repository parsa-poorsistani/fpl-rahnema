const Manager = require('../models/manager-model');

const createManager = async(req, res) => {
    try {
        const manager = await Manager.create(req.body);
        res.status(200).json({ manager });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    createManager,
};