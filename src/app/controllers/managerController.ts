import models = require("../models/path");
import { Request, Response } from "express";

const getDashboard = async (req: Request, res: Response) => {
  try {
    let manager = await models.managerModel
      .findById(req._id)
      .populate(["teamId", { path: "teamId", populate: "picks.player" }]);
    const nb: number = countPlayers(manager.teamId.picks);

    manager.budget = Math.round(manager.budget * 10) / 10;
    manager.save();

    return res.status(200).json({ data: { manager, nb } });
  } catch (err) {
    res.status(403).json({ msg: err });
  }
};

const countPlayers = (team: Array<any>): number => {
  let count = 0;

  for (let player of team) {
    if (player.player !== null) {
      count++;
    }
  }
  return count;
};

module.exports = {
  getDashboard,
};
