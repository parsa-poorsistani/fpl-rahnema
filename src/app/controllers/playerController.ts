import models = require("../../app/models/path");

const getPlayers = async (req: any, res: any) => {
  let players = await models.playerModel
    .find(req.query.filter ? { positionId: req.query.filter } : null)
    .populate({
      path: "position",
      options: { select: { singular_name_short: 1, generalId: 1 } },
    })
    .exec();

  res.status(200).json({ data: players });
};

module.exports = { getPlayers };
