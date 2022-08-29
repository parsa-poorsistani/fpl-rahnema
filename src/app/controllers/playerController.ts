import models = require("../../app/models/path");
import { Request, Response } from "express";

const getPlayers = async (req: Request, res: Response) => {
  let players = await models.playerModel
    .find(req.query.filter ? { positionId: req.query.filter } : null)
    .populate({
      path: "position",
      options: { select: { singular_name_short: 1, generalId: 1 } },
    })
    .exec();

  res.status(200).json({ data: players });
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    const { web_name } = req.body;
    const player = await models.playerModel.find({
      web_name: { $regex: web_name },
    });
    if (Object.keys(player).length === 0) {
      return res.status(404).json({ msg: "player not found" });
    }
    res.status(200).json({ player });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPlayers,
  getPlayerByName,
};
