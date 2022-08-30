import models = require("../../app/models/path");
import { Request, Response } from "express";

const getPlayers = async (req: Request, res: Response) => {
  let players = await models.playerModel
    .find(req.query.filter ? { positionId: req.query.filter } : null)
    .populate([
      { path: "position", select: ["plural_name_short", "generalId"] },
      { path: "plTeam", select: "short_name" },
    ])
    .exec();

  if (Object.keys(players).length === 0) {
    return res.status(404).json({ msg: "no player found" });
  }
  res.status(200).json({ data: players, nbHits: players.length });
};

const getPlayerByName = async (req: Request, res: Response) => {
  try {
    const {web_name} = req.body;
    let players=[];
    if(Object.keys(req.query).length !== 0){
      players = await models.playerModel.find(
        {web_name: new RegExp('^'+web_name+'\w*','i')},
        'web_name form now_cost team_short_name')
        .where('positionId').equals(req.query.filter)
        .populate({ path: "position", select: ["plural_name_short", "generalId"] })
        .populate({ path: "plTeam", select: 'short_name' })
        .exec();
    } else {
      players = await models.playerModel.find(
        {web_name: new RegExp('^'+web_name+'\w*','i')},
        'web_name form now_cost team_short_name'
      )
      .populate({ path: "position", select: ["plural_name_short", "generalId"] })
      .populate({ path: "plTeam", select: 'short_name' })
      .exec();
    }
    if (Object.keys(players).length === 0) {
      return res.status(404).json({ msg: "player not found" });
    }
    return res.status(200).json({ data: players, nbHits: players.length });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

module.exports = {
  getPlayers,
  getPlayerByName,
};
