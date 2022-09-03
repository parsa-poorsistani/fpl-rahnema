const models = require("../models/path");
import { Request, Response } from "express";

const createManager = async (req: any, res: any) => {
  try {
    const team = await models.teamModel.create();
    req.body.teamId = team._id;
    const manager = await models.managerModel.create(req.body);
    console.log(team);

    res.status(200).json({ manager });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getManager = (req: Request, res: Response) => {
  const managerId = req.params.id;
  const manager = models.managerModel.findById(managerId);
  return res.status(200).json({ manager });
};

module.exports = {
  createManager,
  getManager,
};
