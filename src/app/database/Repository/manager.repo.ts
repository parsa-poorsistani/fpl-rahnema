import models = require("../../models/path");

const getManagerById = async (id: string) => {
  const manager = await models.managerModel
    .findById(id)
    .populate("teamId")
    .exec();
  return manager;
};

module.exports = { getManagerById };
