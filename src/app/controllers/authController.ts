const models = require("../models/path");
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signUpManager = async (req: Request, res: Response) => {
  try {
    let picks = [];
    for (let i = 0; i < 15; i++) {
      await picks.push({
        player_id: null,
      });
    }
    const team = await models.teamModel.create({
      picks: picks,
    });

    req.body.teamId = team._id;
    const manager = await models.managerModel.create(req.body);
    const token = jwt.sign({ id: manager._id }, "shhhhh");

    res.status(200).json({ data: { manager: manager, token: token } });
  } catch (error) {
    res.status(500).json({ msg: error._message });
  }
};

module.exports = { signUpManager };
