import models = require("../../app/models/path");

const getPlayers = async (req: any, res: any) => {
  let players = await models.playerModel.find();
  models.playerModel.res.status(200).json({ data: players });
};

module.exports = { getPlayers };
