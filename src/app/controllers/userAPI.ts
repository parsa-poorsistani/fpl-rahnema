import models = require("../../app/models/path");

const createManager = async (req: any, res: any) => {
  try {
    const manager = await models.managerModel.create(req.body);
    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createManager,
};
