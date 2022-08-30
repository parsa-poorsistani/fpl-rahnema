const models = require("../models/path");
import { Request, Response } from "express";

const signUpManager = async (req: Request, res: Response) => {
  try {
    let picks = [];
    for (let i = 0; i < 15; i++) {
      await picks.push({
        player_id: null,
      });
    }
    const team = await models.teamModel.create({
      managerId: "630da3c2a131271215f6f48e",
      picks: picks,
    });
    req.body.teamId = team._id;

    const manager = await models.managerModel.create(req.body);

    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { signUpManager };
